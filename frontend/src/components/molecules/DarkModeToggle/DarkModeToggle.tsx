import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/atoms/Button';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;