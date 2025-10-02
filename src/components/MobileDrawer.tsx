import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Button,
  useTheme,

} from '@mui/material';
import {
  Close as CloseIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Types
interface SocialLink {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems?: string[];
  socialLinks?: SocialLink[];
  name?: string;
  darkMode?: boolean;
  toggleTheme?: () => void;
  handleNavigation?: (item: string) => void;
  isActiveRoute?: (item: string) => boolean;
}

interface NavigatorConnection {
  effectiveType?: string;
}

interface ExtendedNavigator extends Navigator {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
  deviceMemory?: number;
}

// Focus trap utility
const useFocusTrap = (isActive: boolean, containerRef: React.RefObject<HTMLDivElement>): void => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    // Focus first element when drawer opens
    if (firstElement) {
      firstElement.focus();
    }

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive, containerRef]);
};

// Touch gesture hook
const useTouchGestures = (onSwipeClose: () => void, isOpen: boolean) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe && isOpen) {
      onSwipeClose();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Performance detection
const usePerformanceDetection = (): boolean => {
  const [isLowEndDevice, setIsLowEndDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect low-end devices
    const extendedNavigator = navigator as ExtendedNavigator;
    const connection = extendedNavigator.connection || extendedNavigator.mozConnection || extendedNavigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const limitedMemory = extendedNavigator.deviceMemory && extendedNavigator.deviceMemory < 4;
    
    setIsLowEndDevice(slowConnection || limitedMemory || false);
  }, []);

  return isLowEndDevice;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  navItems = [],
  socialLinks = [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
  ],
  name = '<Geno',
  darkMode = false,
  toggleTheme = () => {},
  handleNavigation,
  isActiveRoute,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const isLowEndDevice = usePerformanceDetection();
  
  // Focus management
  useFocusTrap(open, drawerRef);
  
  // Touch gestures
  const touchGestures = useTouchGestures(onClose, open);
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Announce to screen readers
    const announcement = open ? 'Navigation menu opened' : 'Navigation menu closed';
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.style.position = 'absolute';
    ariaLive.style.left = '-10000px';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // GSAP animations
  useEffect(() => {
    if (!open || isLowEndDevice) return;

    const animateItems = async (): Promise<void> => {
      try {
        const gsap = await import('gsap');
        const navItems = drawerRef.current?.querySelectorAll('.nav-item');
        
        if (navItems && navItems.length > 0) {
          gsap.default.fromTo(
            navItems,
            {
              x: -50,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.1,
              ease: 'back.out(1.7)',
            }
          );
        }
      } catch (error) {
        console.warn('GSAP animation failed:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(animateItems, 50);
    return () => clearTimeout(timer);
  }, [open, isLowEndDevice]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Navigation handler
  const handleNavClick = useCallback((item: string): void => {
    if (handleNavigation) {
      handleNavigation(item);
    } else {
      let route: string;
      if (item === 'Home') {
        route = '/';
      } else if (item === 'Activities & Honors') {
        route = '/resume';
      } else {
        route = `/${item.toLowerCase()}`;
      }
      navigate(route);
    }
    onClose();
  }, [navigate, onClose, handleNavigation]);

  // Check if route is active
  const checkActiveRoute = useCallback((item: string): boolean => {
    if (isActiveRoute) {
      return isActiveRoute(item);
    }
    let route: string;
    if (item === 'Home') {
      route = '/';
    } else if (item === 'Activities & Honors') {
      route = '/resume';
    } else {
      route = `/${item.toLowerCase()}`;
    }
    return location.pathname === route;
  }, [location.pathname, isActiveRoute]);

  // Social link handler
  const handleSocialClick = useCallback((url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const drawerContent = (
    <Box
      ref={drawerRef}
      role="dialog"
      aria-label="Mobile navigation"
      aria-modal="true"
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transform: 'translate3d(0, 0, 0)', // Hardware acceleration
      }}
      {...touchGestures}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: '1.25rem',
          }}
        >
          {name}
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label="Close navigation menu"
          sx={{
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 1 }}>
        {(navItems || []).map((item) => {
          const isActive = checkActiveRoute(item);
          
          return (
            <ListItem key={item} disablePadding className="nav-item">
              <ListItemButton
                onClick={() => handleNavClick(item)}
                sx={{
                  minHeight: 44,
                  px: 3,
                  py: 1.5,
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'action.hover'
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2
                  }
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '1rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2, my: 2 }} />

      {/* Theme Toggle */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleTheme}
          sx={{
            justifyContent: 'flex-start',
            minHeight: 44,
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2,
            }
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Box>

      {/* Tagline */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            lineHeight: 1.4
          }}
        >
          Explore my journey from internet café curiosity to AI innovation
        </Typography>
      </Box>

      {/* Social Links */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            px: 1,
            mb: 1,
            color: 'text.secondary',
            fontWeight: 600
          }}
        >
          Connect
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {(socialLinks || []).map((social) => {
            const IconComponent = social.icon;
            return (
              <IconButton
                key={social.name}
                onClick={() => handleSocialClick(social.url)}
                aria-label={`Visit ${social.name} profile`}
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                  color: 'text.secondary',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderColor: 'primary.main'
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2
                  }
                }}
              >
                <IconComponent fontSize="small" />
              </IconButton>
            );
          })}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
        disableScrollLock: false,
        'aria-hidden': !open
      }}
      PaperProps={{
        sx: {
          transform: 'translate3d(0, 0, 0)', // Hardware acceleration
        }
      }}
      SlideProps={{
        timeout: isLowEndDevice ? 150 : 300
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          boxShadow: theme.shadows[8]
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: isLowEndDevice ? 'none' : 'blur(4px)'
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default MobileDrawer;