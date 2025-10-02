import React, { useEffect, useRef, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'rotateIn';
  delay?: number;
  sx?: SxProps<Theme>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  sx = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationStyles = () => {
    const baseStyle = {
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (animation) {
      case 'fadeIn':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
        };
      case 'slideUp':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        };
      case 'slideLeft':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
        };
      case 'slideRight':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
        };
      case 'scaleUp':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        };
      case 'rotateIn':
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-10deg) scale(0.9)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box ref={ref} sx={{ ...getAnimationStyles(), ...sx }}>
      {children}
    </Box>
  );
};

export default AnimatedSection;
