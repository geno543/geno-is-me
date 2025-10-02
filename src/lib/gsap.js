import { useEffect, useRef, useState } from 'react';

// Dynamic GSAP imports for code splitting
let gsap, ScrollTrigger, TextPlugin;

// Initialize GSAP with dynamic imports
export const initGSAP = async () => {
  if (typeof window === 'undefined') return null;

  try {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const textPluginModule = await import('gsap/TextPlugin');

    gsap = gsapModule.gsap;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    TextPlugin = textPluginModule.TextPlugin;

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    return { gsap, ScrollTrigger, TextPlugin };
  } catch (error) {
    console.error('Failed to load GSAP:', error);
    return null;
  }
};

// Custom hook for GSAP initialization
export const useGSAP = (callback, dependencies = []) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const contextRef = useRef();

  useEffect(() => {
    let isMounted = true;

    const loadAndExecute = async () => {
      const gsapModules = await initGSAP();
      
      if (!isMounted || !gsapModules) return;

      setIsLoaded(true);

      // Create GSAP context for cleanup
      contextRef.current = gsapModules.gsap.context(() => {
        if (callback) callback(gsapModules);
      });
    };

    loadAndExecute();

    return () => {
      isMounted = false;
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  return { isLoaded, context: contextRef.current };
};

// Consistent easing curves
export const easings = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  expo: 'expo.out',
  circ: 'circ.out',
  custom: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Master timeline for page transitions
export class PageTransitionManager {
  constructor() {
    this.masterTimeline = null;
    this.isTransitioning = false;
  }

  async init() {
    const gsapModules = await initGSAP();
    if (!gsapModules) return;

    this.gsap = gsapModules.gsap;
    this.masterTimeline = this.gsap.timeline({ paused: true });
  }

  // Page enter animation
  pageEnter(element, options = {}) {
    if (!this.gsap || !element) return;

    const {
      duration = 0.8,
      delay = 0,
      ease = easings.smooth,
      stagger = 0.1,
    } = options;

    const tl = this.gsap.timeline();

    // Fade in and slide up animation
    tl.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        ease,
        delay,
      }
    );

    // Animate child elements with stagger
    const children = element.querySelectorAll('[data-animate]');
    if (children.length > 0) {
      tl.fromTo(
        children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration * 0.6,
          ease,
          stagger,
        },
        '-=0.4'
      );
    }

    return tl;
  }

  // Page exit animation
  pageExit(element, options = {}) {
    if (!this.gsap || !element) return;

    const {
      duration = 0.5,
      ease = easings.smooth,
    } = options;

    return this.gsap.to(element, {
      opacity: 0,
      y: -30,
      scale: 0.98,
      duration,
      ease,
    });
  }

  // Smooth scroll to element
  scrollTo(target, options = {}) {
    if (!this.gsap) return;

    const {
      duration = 1,
      ease = easings.smooth,
      offset = 0,
    } = options;

    this.gsap.to(window, {
      duration,
      scrollTo: {
        y: target,
        offsetY: offset,
      },
      ease,
    });
  }

  // Text reveal animation
  textReveal(element, options = {}) {
    if (!this.gsap || !element) return;

    const {
      duration = 1,
      ease = easings.smooth,
      stagger = 0.02,
    } = options;

    // Split text into characters
    const text = element.textContent;
    const chars = text.split('').map(char => 
      char === ' ' ? '&nbsp;' : `<span style="display: inline-block;">${char}</span>`
    ).join('');
    
    element.innerHTML = chars;
    const charElements = element.querySelectorAll('span');

    return this.gsap.fromTo(
      charElements,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        ease,
        stagger,
      }
    );
  }

  // Parallax scroll effect
  parallax(elements, options = {}) {
    if (!this.gsap || !ScrollTrigger) return;

    const {
      speed = 0.5,
      ease = 'none',
    } = options;

    elements.forEach(element => {
      this.gsap.to(element, {
        yPercent: -50 * speed,
        ease,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  // Cleanup method
  cleanup() {
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}

// Create singleton instance
export const pageTransitionManager = new PageTransitionManager();

// Sample page transition animations
export const sampleAnimations = {
  // Fade and slide transition
  fadeSlide: (element) => ({
    enter: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, duration: 0.8, ease: easings.smooth },
    },
    exit: {
      to: { opacity: 0, y: -30, duration: 0.5, ease: easings.smooth },
    },
  }),

  // Scale and rotate transition
  scaleRotate: (element) => ({
    enter: {
      from: { opacity: 0, scale: 0.8, rotation: -5 },
      to: { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: easings.bounce },
    },
    exit: {
      to: { opacity: 0, scale: 0.9, rotation: 2, duration: 0.4, ease: easings.smooth },
    },
  }),

  // Slide from sides
  slideHorizontal: (element, direction = 'left') => ({
    enter: {
      from: { opacity: 0, x: direction === 'left' ? -100 : 100 },
      to: { opacity: 1, x: 0, duration: 0.7, ease: easings.expo },
    },
    exit: {
      to: { opacity: 0, x: direction === 'left' ? 100 : -100, duration: 0.5, ease: easings.smooth },
    },
  }),
};

// Utility function to check for reduced motion preference
export const respectsReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Apply reduced motion settings
export const applyReducedMotion = (animation) => {
  if (respectsReducedMotion()) {
    return {
      ...animation,
      duration: 0.01,
      ease: 'none',
    };
  }
  return animation;
};