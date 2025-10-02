import React, { useEffect, useState } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import {
  Code,
  Psychology,
  Rocket,
  EmojiEvents,
  Phone,
  School,
  AutoAwesome,
  Lightbulb,
  TrendingUp,
  Terminal,
  DataObject,
  Memory,
} from '@mui/icons-material';

interface FloatingImageProps {
  icon: React.ReactElement;
  delay: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ icon, delay, position, size = 60 }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Box
      sx={{
        position: 'absolute',
        ...position,
        opacity: isVisible ? 0.6 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: 'float 6s ease-in-out infinite',
        animationDelay: `${delay}ms`,
        zIndex: 0,
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-20px) rotate(5deg)',
          },
          '66%': {
            transform: 'translateY(10px) rotate(-5deg)',
          },
        },
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.2
          )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          backdropFilter: 'blur(10px)',
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          color: theme.palette.primary.main,
          fontSize: size / 2,
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.2) rotate(10deg)',
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 'inherit' } })}
      </Box>
    </Box>
  );
};

const FloatingImages: React.FC = () => {
  const floatingElements = [
    { icon: <Code />, delay: 0, position: { top: '10%', right: '10%' }, size: 70 },
    { icon: <Psychology />, delay: 200, position: { top: '25%', left: '5%' }, size: 65 },
    { icon: <Rocket />, delay: 400, position: { top: '45%', right: '8%' }, size: 60 },
    { icon: <EmojiEvents />, delay: 600, position: { top: '65%', left: '12%' }, size: 55 },
    { icon: <Phone />, delay: 800, position: { bottom: '30%', right: '15%' }, size: 50 },
    { icon: <School />, delay: 1000, position: { bottom: '15%', left: '8%' }, size: 58 },
    { icon: <AutoAwesome />, delay: 1200, position: { top: '35%', left: '20%' }, size: 45 },
    { icon: <Lightbulb />, delay: 1400, position: { bottom: '45%', right: '5%' }, size: 52 },
    { icon: <TrendingUp />, delay: 1600, position: { top: '55%', left: '15%' }, size: 48 },
    { icon: <Terminal />, delay: 1800, position: { bottom: '25%', left: '25%' }, size: 55 },
    { icon: <DataObject />, delay: 2000, position: { top: '15%', left: '35%' }, size: 50 },
    { icon: <Memory />, delay: 2200, position: { bottom: '35%', right: '25%' }, size: 53 },
  ];

  return (
    <>
      {floatingElements.map((element, index) => (
        <FloatingImage key={index} {...element} />
      ))}
    </>
  );
};

export default FloatingImages;
