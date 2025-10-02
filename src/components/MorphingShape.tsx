import React, { useEffect, useRef } from 'react';
import { Box, alpha, useTheme } from '@mui/material';

const MorphingShape: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      // Create morphing blob
      ctx.beginPath();
      for (let i = 0; i <= 360; i += 1) {
        const angle = (i * Math.PI) / 180;
        const offset = Math.sin(time * 0.5 + i * 0.05) * 30 + Math.cos(time * 0.3 + i * 0.03) * 20;
        const x = centerX + Math.cos(angle) * (radius + offset);
        const y = centerY + Math.sin(angle) * (radius + offset);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, alpha(theme.palette.primary.main, 0.2));
      gradient.addColorStop(0.5, alpha(theme.palette.primary.main, 0.1));
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fill();

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme.palette.primary.main]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    >
      <canvas ref={canvasRef} style={{ filter: 'blur(40px)' }} />
    </Box>
  );
};

export default MorphingShape;
