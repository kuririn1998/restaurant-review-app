import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string()
      .required('Username or email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log('Login form submitted:', {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
        rememberMe,
      });
    },
  });

  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant='h4' align='center' gutterBottom>
        Log in
      </Typography>
      <TextField
        fullWidth
        margin='normal'
        label='Username or email'
        variant='outlined'
        name='usernameOrEmail'
        value={formik.values.usernameOrEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
        helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
      />
      <TextField
        fullWidth
        margin='normal'
        label='Password'
        type={showPassword ? 'text' : 'password'}
        variant='outlined'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <Button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Button>
          ),
        }}
      />
      <Link href='#' variant='body2'>
        <Typography variant='body2' sx={{ mb: 2 }}>
          Forgot your password?
        </Typography>
      </Link>
      <FormControlLabel
        control={
          <Checkbox
            value='remember'
            color='primary'
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
        }
        label='Remember me'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        disabled={!formik.isValid || !formik.dirty}
      >
        Log in
      </Button>
      <Typography variant='body2' align='center'>
        Or log in with
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 6 }}>
        <Button variant='outlined'>GitHub</Button>
        <Button variant='outlined'>Google</Button>
      </Box>
      <Typography variant='body2' align='center' sx={{ mt: 2 }}>
        Don&apos;t have an account? <Link href='/signup'>Sign up for free</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
