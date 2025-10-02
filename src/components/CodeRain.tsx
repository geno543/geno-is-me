import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';

interface CodeRainProps {
  text: string;
  speed?: number;
  fontSize?: number;
}

const CodeRain: React.FC<CodeRainProps> = ({ text, speed = 50, fontSize = 14 }) => {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <Box
      sx={{
        fontFamily: 'monospace',
        fontSize,
        color: theme.palette.primary.main,
        position: 'relative',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        '&::after': {
          content: '"|"',
          animation: 'blink 1s infinite',
          '@keyframes blink': {
            '0%, 50%': { opacity: 1 },
            '51%, 100%': { opacity: 0 },
          },
        },
      }}
    >
      {displayText}
    </Box>
  );
};

export default CodeRain;
