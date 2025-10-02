import React, { useEffect, useRef, useState } from 'react';
import { Box, alpha, useTheme } from '@mui/material';

interface StoryVideoProps {
  videoSrc?: string;
  placeholder: string;
  overlay?: boolean;
}

const StoryVideo: React.FC<StoryVideoProps> = ({ videoSrc, placeholder, overlay = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {videoSrc ? (
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </Box>
      ) : (
        <Box
          component="img"
          src={placeholder}
          alt="Story visual"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha('#000', 0.7)})`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha('#000', 0.4)})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default StoryVideo;
