import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

interface ImageRevealProps {
  src: string;
  alt: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

const ImageReveal: React.FC<ImageRevealProps> = ({ src, alt, direction = 'left' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return 'translateX(-100%)';
      case 'right':
        return 'translateX(100%)';
      case 'top':
        return 'translateY(-100%)';
      case 'bottom':
        return 'translateY(100%)';
      default:
        return 'translateX(-100%)';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: isVisible ? 'translate(0, 0) scale(1)' : `${getTransform()} scale(1.1)`,
          transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.6))',
          transform: isVisible ? getTransform() : 'translate(0, 0)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}
      />
    </Box>
  );
};

export default ImageReveal;
