// Service Worker Registration Utility
// Handles registration and lifecycle management of the service worker

interface ServiceWorkerOptions {
  enableNotifications?: boolean
  checkForUpdatesInterval?: number
  enableCacheInfo?: boolean
}

interface CacheUsage {
  quota?: number
  usage?: number
  usagePercentage: string
}

type NotificationPermissionResult = 'granted' | 'denied' | 'unsupported' | 'error'

const isProduction = import.meta.env.PROD
const swPath = '/sw.js'

// Check if service workers are supported
export const isServiceWorkerSupported = (): boolean => {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator
}

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    console.log('Service workers are not supported in this browser')
    return null
  }

  try {
    console.log('Registering service worker...')
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: '/',
    })

    console.log('Service worker registered successfully:', registration)

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        console.log('New service worker found, installing...')
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New update available
              console.log('New content is available; please refresh.')
              showUpdateNotification()
            } else {
              // Content is cached for offline use
              console.log('Content is cached for offline use.')
            }
          }
        })
      }
    })

    return registration
  } catch (error) {
    console.error('Service worker registration failed:', error)
    return null
  }
}

// Unregister service worker
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      const unregistered = await registration.unregister()
      console.log('Service worker unregistered:', unregistered)
      return unregistered
    }
    return false
  } catch (error) {
    console.error('Service worker unregistration failed:', error)
    return false
  }
}

// Check for service worker updates
export const checkForUpdates = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      await registration.update()
      console.log('Checked for service worker updates')
      return true
    }
    return false
  } catch (error) {
    console.error('Failed to check for updates:', error)
    return false
  }
}

// Show update notification to user
const showUpdateNotification = (): void => {
  // Create a simple notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Update Available', {
      body: 'A new version of the app is available. Please refresh to update.',
      icon: '/favicon.ico',
      tag: 'app-update',
    })
  } else {
    // Fallback to console log or custom UI notification
    console.log('App update available - please refresh the page')
    
    // You could dispatch a custom event here for the UI to handle
    window.dispatchEvent(new CustomEvent('app-update-available', {
      detail: { message: 'A new version is available. Please refresh to update.' }
    }))
  }
}

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermissionResult> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return 'unsupported'
  }

  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission === 'denied') {
    return 'denied'
  }

  try {
    const permission = await Notification.requestPermission()
    console.log('Notification permission:', permission)
    return permission as NotificationPermissionResult
  } catch (error) {
    console.error('Failed to request notification permission:', error)
    return 'error'
  }
}

// Get cache usage information
export const getCacheUsage = async (): Promise<CacheUsage | null> => {
  if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
    return null
  }

  try {
    const estimate = await navigator.storage.estimate()
    return {
      quota: estimate.quota,
      usage: estimate.usage,
      usagePercentage: ((estimate.usage! / estimate.quota!) * 100).toFixed(2),
    }
  } catch (error) {
    console.error('Failed to get cache usage:', error)
    return null
  }
}

// Clear all caches
export const clearAllCaches = async (): Promise<boolean> => {
  if (!('caches' in window)) {
    return false
  }

  try {
    const cacheNames = await caches.keys()
    const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName))
    await Promise.all(deletePromises)
    console.log('All caches cleared')
    return true
  } catch (error) {
    console.error('Failed to clear caches:', error)
    return false
  }
}

// Service worker lifecycle hooks
export const onServiceWorkerReady = (callback: (registration: ServiceWorkerRegistration) => void): void => {
  if (!isServiceWorkerSupported()) {
    return
  }

  navigator.serviceWorker.ready.then(callback)
}

export const onServiceWorkerUpdate = (callback: (event: Event) => void): void => {
  if (!isServiceWorkerSupported()) {
    return
  }

  navigator.serviceWorker.addEventListener('controllerchange', callback)
}

// Initialize service worker with options
export const initServiceWorker = async (options: ServiceWorkerOptions = {}): Promise<ServiceWorkerRegistration | null> => {
  const {
    enableNotifications = false,
    checkForUpdatesInterval = 60000, // 1 minute
    enableCacheInfo = false,
  } = options

  // Register service worker
  const registration = await registerServiceWorker()
  
  if (!registration) {
    return null
  }

  // Request notification permission if enabled
  if (enableNotifications) {
    await requestNotificationPermission()
  }

  // Set up periodic update checks
  if (checkForUpdatesInterval > 0) {
    setInterval(() => {
      checkForUpdates()
    }, checkForUpdatesInterval)
  }

  // Log cache usage if enabled
  if (enableCacheInfo) {
    const cacheUsage = await getCacheUsage()
    if (cacheUsage) {
      console.log('Cache usage:', cacheUsage)
    }
  }

  return registration
}