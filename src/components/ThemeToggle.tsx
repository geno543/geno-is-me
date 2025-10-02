import React, { useContext } from 'react';
import { IconButton, Tooltip, useTheme, SxProps, Theme, IconButtonProps } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../pages/_app';

// Type definitions
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeToggleProps extends Omit<IconButtonProps, 'onClick' | 'color' | 'aria-label'> {
  sx?: SxProps<Theme>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ sx = {}, ...props }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
  const theme = useTheme();

  return (
    <Tooltip 
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      placement="bottom"
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        sx={{
          transition: theme.transitions.create(['transform', 'color'], {
            duration: theme.transitions.duration.short,
          }),
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
          ...sx,
        }}
        {...props}
      >
        {isDarkMode ? (
          <Brightness7 
            sx={{ 
              fontSize: '1.5rem',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.short,
              }),
            }} 
          />
        ) : (
          <Brightness4 
            sx={{ 
              fontSize: '1.5rem',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.short,
              }),
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;