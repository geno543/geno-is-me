import React, { Suspense, useState, useEffect } from 'react';
import { Box, CircularProgress, useTheme, SxProps, Theme } from '@mui/material';

// Type definitions
interface SplineApp {
  // Add specific Spline app methods/properties as needed
  [key: string]: any;
}

interface SplineRobotProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  onLoad?: (splineApp: SplineApp) => void;
  onError?: (error: Error) => void;
  sx?: SxProps<Theme>;
  [key: string]: any; // For additional props
}

// Dynamically import Spline component
const SplineComponent = React.lazy(() => 
  import('@splinetool/react-spline').then(module => ({
    default: module.default
  }))
);

const SplineRobot: React.FC<SplineRobotProps> = ({ 
  width = 400, 
  height = 400, 
  className = '',
  onLoad = () => {},
  onError = () => {},
  sx,
  ...props 
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [splineApp, setSplineApp] = useState<SplineApp | null>(null);

  // Robot model URL - using verified working robot model from tutorial
  const robotModelUrl = 'https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode';

  const handleLoad = (splineAppInstance: SplineApp): void => {
    setIsLoading(false);
    setSplineApp(splineAppInstance);
    onLoad(splineAppInstance);
  };

  const handleError = (error: Error): void => {
    console.warn('Spline model failed to load:', error);
    setIsLoading(false);
    setHasError(true);
    onError(error);
  };

  // Fallback SVG robot when Spline fails to load
  const FallbackRobot: React.FC = () => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: 'transparent' }}
    >
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: theme.palette.primary.main, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: theme.palette.secondary.main, stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Robot Body */}
      <rect x="150" y="180" width="100" height="120" rx="20" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Robot Head */}
      <rect x="160" y="120" width="80" height="80" rx="15" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Eyes */}
      <circle cx="180" cy="150" r="8" fill="#00ffff" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="220" cy="150" r="8" fill="#00ffff" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      {/* Mouth */}
      <rect x="185" y="170" width="30" height="4" rx="2" fill="#00ffff" opacity="0.7"/>
      
      {/* Arms */}
      <rect x="120" y="200" width="20" height="60" rx="10" fill="url(#robotGradient)" filter="url(#glow)"/>
      <rect x="260" y="200" width="20" height="60" rx="10" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Hands */}
      <circle cx="130" cy="270" r="12" fill="url(#robotGradient)" filter="url(#glow)"/>
      <circle cx="270" cy="270" r="12" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Legs */}
      <rect x="165" y="300" width="18" height="50" rx="9" fill="url(#robotGradient)" filter="url(#glow)"/>
      <rect x="217" y="300" width="18" height="50" rx="9" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Feet */}
      <ellipse cx="174" cy="360" rx="15" ry="8" fill="url(#robotGradient)" filter="url(#glow)"/>
      <ellipse cx="226" cy="360" rx="15" ry="8" fill="url(#robotGradient)" filter="url(#glow)"/>
      
      {/* Chest Panel */}
      <rect x="170" y="210" width="60" height="40" rx="8" fill="none" stroke="#00ffff" strokeWidth="2" opacity="0.6"/>
      <circle cx="200" cy="230" r="8" fill="#00ffff" opacity="0.8">
        <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
      </circle>
      
      {/* Antenna */}
      <line x1="200" y1="120" x2="200" y2="100" stroke="#00ffff" strokeWidth="3" opacity="0.8"/>
      <circle cx="200" cy="95" r="5" fill="#ff0080" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1s" repeatCount="indefinite"/>
      </circle>
      
      {/* Floating particles */}
      <circle cx="100" cy="150" r="3" fill="#00ffff" opacity="0.5">
        <animateTransform attributeName="transform" type="translate" values="0,0; 10,-10; 0,0" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="320" cy="200" r="2" fill="#ff0080" opacity="0.6">
        <animateTransform attributeName="transform" type="translate" values="0,0; -15,15; 0,0" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="280" r="4" fill="#00ff80" opacity="0.4">
        <animateTransform attributeName="transform" type="translate" values="0,0; 20,5; 0,0" dur="6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );

  return (
    <Box
      className={className}
      sx={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderRadius: '50%',
        overflow: 'hidden',
        ...sx,
      }}
      {...props}
    >
      {!hasError ? (
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <CircularProgress 
                size={60} 
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
          }
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              '& canvas': {
                width: '100% !important',
                height: '100% !important',
                background: 'transparent !important',
              }
            }}
          >
            <SplineComponent
              scene={robotModelUrl}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
              }}
            />
          </Box>
        </Suspense>
      ) : (
        <FallbackRobot />
      )}

      {/* Loading overlay */}
      {isLoading && !hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
          }}
        >
          <CircularProgress 
            size={60} 
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SplineRobot;