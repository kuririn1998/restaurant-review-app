// src/theme/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const createAppTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#f5c754',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#1c2936',
      paper: mode === 'light' ? '#f5f5f5' : '#2c3a47',
    },
  },
});

export const lightTheme = createTheme(createAppTheme('light'));
export const darkTheme = createTheme(createAppTheme('dark'));

export default createAppTheme;
