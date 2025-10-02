import React, { useEffect, useRef, useState } from 'react';
import { Box, useTheme, alpha } from '@mui/material';

interface ParallaxSceneProps {
  children?: React.ReactNode;
}

const ParallaxScene: React.FC<ParallaxSceneProps> = ({ children }) => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sceneRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      ref={sceneRef}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3,
            transform: `translateY(${scrollY * (Math.random() * 50 + 20)}px)`,
            transition: 'transform 0.1s linear',
            animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />
      ))}

      {/* Parallax layers */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${scrollY * 30}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxScene;
