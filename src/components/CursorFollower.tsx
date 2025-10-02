import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';

interface MousePosition {
  x: number;
  y: number;
}

const CursorFollower: React.FC = () => {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('button, a').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('button, a').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <Box
        ref={cursorRef}
        sx={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.primary.main}`,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          zIndex: 9999,
          mixBlendMode: 'difference',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          display: { xs: 'none', md: 'block' },
        }}
      />
    </>
  );
};

export default CursorFollower;
