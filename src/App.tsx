import React, { createContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, GlobalStyles, Theme } from '@mui/material'
import { getTheme } from './theme'
import SkipLink from './components/SkipLink'
import { initServiceWorker } from './lib/serviceWorker'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ActivitiesHonors from './pages/ActivitiesHonors'

// Type definitions
interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

// Theme Context
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
})

// Custom hook for theme persistence
const useThemePersistence = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true) // Default to dark mode
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme-preference')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(systemPrefersDark)
    }
    
    setIsLoaded(true)
  }, [])

  const toggleTheme = (): void => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme-preference', newMode ? 'dark' : 'light')
  }

  return { isDarkMode, toggleTheme, isLoaded }
}

// Global styles for CSS reset and accessibility
const globalStyles = (theme: Theme) => ({
  // CSS Reset and base styles
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    // Smooth transitions for theme changes
    transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
  },
  'html, body': {
    height: '100%',
    scrollBehavior: 'smooth',
    // Respect user's motion preferences
    '@media (prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
      },
    },
  },
  body: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    lineHeight: 1.6,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '#root': {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  // Enhanced focus styles for accessibility
  '*:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
    borderRadius: '4px',
  },
  // Remove default focus styles for mouse users
  '*:focus:not(:focus-visible)': {
    outline: 'none',
  },
  // Custom scrollbar
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.paper,
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
    },
  },
  // Selection color
  '::selection': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  // Skip link styles
  '.skip-link': {
    position: 'absolute',
    top: '-40px',
    left: '6px',
    zIndex: 9999,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '8px 16px',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'top 0.3s ease-in-out',
    '&:focus': {
      top: '6px',
    },
  },
  // Ensure proper heading hierarchy
  'h1, h2, h3, h4, h5, h6': {
    lineHeight: 1.2,
    fontWeight: 600,
  },
  // Improve link accessibility
  'a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  },
  // Button accessibility improvements
  'button': {
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
  // Image accessibility
  'img': {
    maxWidth: '100%',
    height: 'auto',
  },
  // Form accessibility
  'input, textarea, select': {
    fontSize: '16px', // Prevent zoom on iOS
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  },
  // High contrast mode support
  '@media (prefers-contrast: high)': {
    '*': {
      borderColor: `${theme.palette.text.primary} !important`,
    },
  },
  // Accessibility improvements
  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
})

function App(): React.ReactElement {
  const { isDarkMode, toggleTheme, isLoaded } = useThemePersistence()
  const theme = getTheme(isDarkMode)

  // Initialize service worker for performance optimization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initServiceWorker({
        enableNotifications: false, // Can be enabled later
        checkForUpdatesInterval: 300000, // Check every 5 minutes
        enableCacheInfo: process.env.NODE_ENV === 'development',
      })
    }
  }, [])

  // Set document meta tags
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Set theme color meta tag
      let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
      if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta')
        themeColorMeta.setAttribute('name', 'theme-color')
        document.head.appendChild(themeColorMeta)
      }
      themeColorMeta.setAttribute('content', theme.palette.primary.main)

      // Set color scheme meta tag
      let colorSchemeMeta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement
      if (!colorSchemeMeta) {
        colorSchemeMeta = document.createElement('meta')
        colorSchemeMeta.setAttribute('name', 'color-scheme')
        document.head.appendChild(colorSchemeMeta)
      }
      colorSchemeMeta.setAttribute('content', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode, theme.palette.primary.main])

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return <div style={{ display: 'none' }} />
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles(theme)} />
        <SkipLink href="#main-content" />
        
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/activities-honors" element={<ActivitiesHonors />} />
            <Route path="/contact" element={<Contact />} />
            {/* Redirect old resume route to activities-honors */}
            <Route path="/resume" element={<ActivitiesHonors />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App