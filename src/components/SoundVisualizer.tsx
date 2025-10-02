import React, { useEffect, useState } from 'react';
import { Box, useTheme, alpha, IconButton } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const SoundVisualizer: React.FC = () => {
  const theme = useTheme();
  const [isMuted, setIsMuted] = useState(true);
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 5 }, () => Math.random() * 60 + 20);
      setBars(newBars);
    };

    const interval = setInterval(() => {
      if (!isMuted) {
        generateBars();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.5,
          height: 40,
        }}
      >
        {bars.map((height, index) => (
          <Box
            key={index}
            sx={{
              width: 4,
              height: isMuted ? 10 : `${height}%`,
              background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 1,
              transition: 'height 0.2s ease',
              animation: isMuted ? 'none' : `wave 0.5s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              '@keyframes wave': {
                '0%, 100%': { transform: 'scaleY(1)' },
                '50%': { transform: 'scaleY(1.5)' },
              },
            }}
          />
        ))}
      </Box>
      <IconButton
        onClick={toggleMute}
        sx={{
          width: 40,
          height: 40,
          background: alpha(theme.palette.primary.main, 0.1),
          backdropFilter: 'blur(10px)',
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          color: theme.palette.primary.main,
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.2),
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {isMuted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
    </Box>
  );
};

export default SoundVisualizer;
