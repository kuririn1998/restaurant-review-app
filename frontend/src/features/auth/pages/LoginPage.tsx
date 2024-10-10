import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container component='main' maxWidth='sm'>
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant='h4' component='h1' align='center' gutterBottom>
          Acme Inc
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage;
