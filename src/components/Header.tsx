import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import MobileDrawer from './MobileDrawer';

// Types
interface HideOnScrollProps {
  children: React.ReactElement;
  window?: () => Window;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface HeaderProps {
  name?: string;
  navItems?: string[];
  socialLinks?: SocialLink[];
  darkMode?: boolean;
  toggleTheme?: () => void;
  window?: () => Window;
}

// Hide on scroll component
function HideOnScroll({ children, window }: HideOnScrollProps) {
  const trigger = useScrollTrigger({
    target: window && typeof window !== 'undefined' ? window() : undefined,
    threshold: 100,
    disableHysteresis: true,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC<HeaderProps> = ({ 
  name = "<Geno", 
  navItems = ['About', 'Projects', 'Activities & Honors'], 
  socialLinks = [],
  darkMode = false, 
  toggleTheme = () => {},
  window 
}) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle mobile drawer toggle
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  // Handle navigation
  const handleNavigation = (item: string): void => {
    let route: string;
    if (item === 'Home') {
      route = '/';
    } else if (item === 'Activities & Honors') {
      route = '/activities-honors';
    } else {
      route = `/${item.toLowerCase()}`;
    }
    navigate(route);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Check if route is active
  const isActiveRoute = (item: string): boolean => {
    let route: string;
    if (item === 'Home') {
      route = '/';
    } else if (item === 'Activities & Honors') {
      route = '/activities-honors';
    } else {
      route = `/${item.toLowerCase()}`;
    }
    return location.pathname === route || (item === 'Activities & Honors' && location.pathname === '/resume');
  };

  // Handle scroll effects
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof globalThis.window !== 'undefined') {
      const handleScroll = (): void => {
        const scrollTop = globalThis.window.scrollY;
        setIsScrolled(scrollTop > 50);
      };

      globalThis.window.addEventListener('scroll', handleScroll);
      return () => globalThis.window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const initAnimations = async (): Promise<void> => {
      try {
        const { gsap } = await import('gsap');
        
        // Initial header animation
        if (headerRef.current) {
          gsap.fromTo(headerRef.current, 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }

        // Header shrink animation on scroll
        const tl = gsap.timeline({ paused: true });
        if (headerRef.current) {
          tl.to(headerRef.current, {
            paddingTop: '8px',
            paddingBottom: '8px',
            duration: 0.3,
            ease: "power2.out"
          });
        }

        // Update timeline based on scroll state
        if (isScrolled) {
          tl.play();
        } else {
          tl.reverse();
        }
      } catch (error) {
        console.warn('GSAP not available:', error);
      }
    };

    initAnimations();
  }, [isScrolled]);

  // Mobile drawer GSAP animation
  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') return;
    // Animation is now handled by MobileDrawer component
  }, [mobileOpen, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Keyboard navigation is now handled by MobileDrawer component
  }, [mobileOpen]);

  return (
    <>
      {/* Skip Link */}
      <Button
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          '&:focus': {
            left: '16px',
            top: '16px',
          }
        }}
      >
        Skip to main content
      </Button>

      <HideOnScroll window={window}>
        <AppBar
          ref={headerRef}
          position="fixed"
          role="banner"
          elevation={0}
          sx={{
            background: darkMode
              ? `linear-gradient(135deg, rgba(30, 30, 30, 0.85), rgba(20, 20, 20, 0.85))`
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(250, 250, 250, 0.85))`,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: 'none',
            borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.37)'
              : '0 8px 32px rgba(31, 38, 135, 0.15)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            py: isScrolled ? 1 : 1.5,
            mt: 2,
            mx: { xs: 2, sm: 3, md: 4 },
            left: { xs: 0, sm: 0, md: 0 },
            right: { xs: 0, sm: 0, md: 0 },
            width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)', md: 'calc(100% - 64px)' },
            borderRadius: isScrolled ? '20px' : '24px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: darkMode
                ? `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}20)`
                : `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}15)`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
          }}
        >
          <Toolbar
            component="nav"
            role="navigation"
            aria-label="main navigation"
            sx={{
              justifyContent: 'space-between',
              maxWidth: 1200,
              width: '100%',
              mx: 'auto',
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Logo/Name */}
            <Typography
              variant="h5"
              component="div"
              onClick={() => handleNavigation('Home')}
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '-0.02em',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  filter: 'brightness(1.2)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 4,
                  borderRadius: 2,
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${name} - Go to homepage`}
            >
              {name}
            </Typography>

            {/* Tagline - Hidden on mobile */}
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'none', md: 'block' },
                color: 'text.secondary',
                fontStyle: 'italic',
                mx: 3,
                flexGrow: 1,
                textAlign: 'center',
              }}
            >
              Building tomorrow's AI, one algorithm at a time
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {(navItems || []).map((item) => (
                <Button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  variant={isActiveRoute(item) ? 'contained' : 'text'}
                  sx={{
                    mx: 0.5,
                    px: 2.5,
                    py: 1,
                    fontWeight: isActiveRoute(item) ? 600 : 500,
                    fontSize: '0.9rem',
                    borderRadius: '12px',
                    textTransform: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(isActiveRoute(item) ? {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                      }
                    } : {
                      color: 'text.primary',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateY(-1px)',
                      }
                    }),
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: 2,
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
              
              {/* Theme Toggle */}
              <IconButton
                onClick={toggleTheme}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                sx={{
                  ml: 1,
                  borderRadius: '12px',
                  background: alpha(theme.palette.primary.main, 0.08),
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.15),
                    transform: 'rotate(180deg)',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                  }
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        navItems={['Home', ...navItems]}
        socialLinks={socialLinks}
        name={name}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        handleNavigation={handleNavigation}
        isActiveRoute={isActiveRoute}
      />

      {/* Spacer for fixed header */}
      <Toolbar sx={{ mb: 4 }} />
    </>
  );
};

export default Header;