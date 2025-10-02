import React, { useEffect, useRef } from 'react';
import { Box, useTheme, alpha } from '@mui/material';

interface VideoBackgroundProps {
  opacity?: number;
  overlay?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  opacity = 0.3,
  overlay = true,
}) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      phase: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2 + yOffset);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          yOffset +
          Math.sin((x * frequency + phase) / 100) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, alpha(color, 0.1));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves
      drawWave(
        -50,
        30,
        0.02,
        time,
        theme.palette.primary.main
      );
      drawWave(
        0,
        40,
        0.015,
        time * 1.2,
        theme.palette.secondary.main
      );
      drawWave(
        50,
        35,
        0.025,
        time * 0.8,
        theme.palette.primary.light
      );

      time += 2;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity,
        }}
      />
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(180deg, transparent 0%, ${theme.palette.background.default} 100%)`,
          }}
        />
      )}
    </Box>
  );
};

export default VideoBackground;
