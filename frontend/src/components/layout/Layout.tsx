import React, { useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/contexts/ThemeContext';
import { lightTheme, darkTheme } from '@/theme/theme';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'My App' }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position='static' color='default' elevation={1}>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {isMounted && (
              <IconButton onClick={toggleDarkMode} color='inherit'>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Container component='main' sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {children}
        </Container>
        <Box component='footer' sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} {title}. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default Layout;
