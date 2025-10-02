import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';

interface AnimatedGradientProps {
  colors?: string[];
  speed?: number;
  blur?: number;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 20,
  blur = 100,
}) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.primary.light,
  ];

  const gradientColors = colors || defaultColors;

  return (
    <>
      {gradientColors.map((color, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: { xs: '400px', md: '600px' },
            height: { xs: '400px', md: '600px' },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(color, 0.2)}, transparent 70%)`,
            filter: `blur(${blur}px)`,
            animation: `float${index} ${speed + index * 5}s ease-in-out infinite`,
            top: `${20 + index * 15}%`,
            left: `${10 + index * 25}%`,
            '@keyframes float0': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
              },
              '33%': {
                transform: 'translate(30px, -50px) rotate(120deg)',
              },
              '66%': {
                transform: 'translate(-20px, 20px) rotate(240deg)',
              },
            },
            '@keyframes float1': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
              },
              '33%': {
                transform: 'translate(-40px, 30px) rotate(120deg)',
              },
              '66%': {
                transform: 'translate(20px, -40px) rotate(240deg)',
              },
            },
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
              },
              '33%': {
                transform: 'translate(50px, 20px) rotate(120deg)',
              },
              '66%': {
                transform: 'translate(-30px, -30px) rotate(240deg)',
              },
            },
          }}
        />
      ))}
    </>
  );
};

export default AnimatedGradient;
