import { createTheme, Theme } from '@mui/material/styles'

// Extend the Theme interface to include custom properties
declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      primary: string
      secondary: string
      tertiary: string
    }
  }

  interface PaletteOptions {
    surface?: {
      primary: string
      secondary: string
      tertiary: string
    }
  }
}

// Green accent color palette with WCAG AA compliant contrast ratios
const greenPalette = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e', // Primary green
  600: '#16a34a', // Secondary green
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
} as const

// Eye-friendly dark mode colors
const darkColors = {
  background: {
    default: '#0a0a0a', // Deep black for reduced eye strain
    paper: '#111111',
    elevated: '#1a1a1a',
  },
  surface: {
    primary: '#1f1f1f',
    secondary: '#2a2a2a',
    tertiary: '#333333',
  },
  text: {
    primary: '#ffffff',
    secondary: '#e5e5e5',
    disabled: '#888888',
  },
} as const

// Light mode colors
const lightColors = {
  background: {
    default: '#ffffff',
    paper: '#fafafa',
    elevated: '#f5f5f5',
  },
  surface: {
    primary: '#f8f9fa',
    secondary: '#e9ecef',
    tertiary: '#dee2e6',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#4a4a4a',
    disabled: '#888888',
  },
} as const

// Common theme configuration
const commonTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: greenPalette[500],
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: greenPalette[600],
            },
          },
        },
        '*': {
          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        // Reduced motion support
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            transition: 'none !important',
            animation: 'none !important',
          },
        },
        // Focus-visible outlines for accessibility
        '*:focus-visible': {
          outline: `2px solid ${greenPalette[500]}`,
          outlineOffset: '2px',
        },
        // Selection color
        '::selection': {
          backgroundColor: greenPalette[500],
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-visible': {
            outline: `2px solid ${greenPalette[500]}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
} as const

// Dark theme
export const darkTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: greenPalette[500],
      light: greenPalette[400],
      dark: greenPalette[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: greenPalette[600],
      light: greenPalette[500],
      dark: greenPalette[700],
      contrastText: '#ffffff',
    },
    background: darkColors.background,
    surface: darkColors.surface,
    text: darkColors.text,
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
})

// Light theme
export const lightTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: greenPalette[600],
      light: greenPalette[500],
      dark: greenPalette[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: greenPalette[700],
      light: greenPalette[600],
      dark: greenPalette[800],
      contrastText: '#ffffff',
    },
    background: lightColors.background,
    surface: lightColors.surface,
    text: lightColors.text,
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
})

// Theme context and utilities
export const getTheme = (isDark: boolean): Theme => (isDark ? darkTheme : lightTheme)

// Export createTheme for direct usage if needed
export { createTheme }

// Export default as dark theme (default mode)
export default darkTheme