import React, { useRef, ReactNode } from 'react';
import { Box, BoxProps, SxProps, Theme } from '@mui/material';
import { useGSAP, pageTransitionManager, respectsReducedMotion } from '../lib/gsap';

// Type definitions
type AnimationType = 'fadeSlide' | 'fade' | 'slide' | 'scale' | 'none';

interface PageTransitionProps extends Omit<BoxProps, 'component' | 'role'> {
  children: ReactNode;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  sx?: SxProps<Theme>;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  animationType = 'fadeSlide',
  duration = 0.8,
  delay = 0,
  sx,
  ...props 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  const { isLoaded } = useGSAP(() => {
    if (!containerRef.current || hasAnimated.current) return;

    // Initialize page transition manager
    pageTransitionManager.init();

    // Skip animations if user prefers reduced motion
    if (respectsReducedMotion()) {
      hasAnimated.current = true;
      return;
    }

    // Apply page enter animation
    pageTransitionManager.pageEnter(
      containerRef.current,
      {
        duration,
        delay,
      }
    );

    hasAnimated.current = true;
  }, [animationType, duration, delay]);

  return (
    <Box
      ref={containerRef}
      component="main"
      role="main"
      sx={{
        minHeight: '100vh',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PageTransition;