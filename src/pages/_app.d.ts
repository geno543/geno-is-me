import React from 'react';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext: React.Context<ThemeContextType>;
