import React, { createContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { getTheme } from '../theme';
import SkipLink from '../components/SkipLink';
import { initServiceWorker } from '../lib/serviceWorker';

const inter = Inter({ subsets: ['latin'] });

// Theme Context
export const ThemeContext = createContext();

// Custom hook for theme persistence
const useThemePersistence = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(systemPrefersDark);
    }
    
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme-preference', newMode ? 'dark' : 'light');
  };

  return { isDarkMode, toggleTheme, isLoaded };
};

// Global styles for CSS reset and accessibility
const globalStyles = (theme) => ({
  // CSS Reset and base styles
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
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
    fontFamily: inter.style.fontFamily,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    lineHeight: 1.6,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '#__next': {
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
  // Smooth transitions for theme changes
  '*': {
    transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
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
});

export default function App({ Component, pageProps }) {
  const { isDarkMode, toggleTheme, isLoaded } = useThemePersistence();
  const theme = getTheme(isDarkMode);

  // Initialize service worker for performance optimization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initServiceWorker({
        enableNotifications: false, // Can be enabled later
        checkForUpdatesInterval: 300000, // Check every 5 minutes
        enableCacheInfo: process.env.NODE_ENV === 'development',
      });
    }
  }, []);

  // Prevent flash of unstyled content
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="color-scheme" content={isDarkMode ? 'dark' : 'light'} />
        
        {/* Accessibility meta tags */}
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles(theme)} />
        
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          <SkipLink href="#main-content" />
          <div id="main-content">
            <Component {...pageProps} />
          </div>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

// Enable automatic static optimization
App.getInitialProps = async () => ({});