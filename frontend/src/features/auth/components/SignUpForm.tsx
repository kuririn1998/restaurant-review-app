import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm: React.FC = () => {
  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
    agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the Terms of Service'),
    agreePrivacy: Yup.boolean().oneOf([true], 'You must acknowledge the Privacy Policy'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
    validationSchema,
    onSubmit: values => {
      console.log('Sign up:', values);
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant='h5' component='h1' gutterBottom>
        Create an account
      </Typography>
      <Box component='form' onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin='normal'
          required
          fullWidth
          id='userName'
          label='Username'
          name='userName'
          autoComplete='username'
          autoFocus
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          autoComplete='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='new-password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='confirmPassword'
          label='Confirm password'
          type='password'
          id='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <FormControlLabel
          control={
            <Checkbox
              id='agreeTerms'
              name='agreeTerms'
              color='primary'
              checked={formik.values.agreeTerms}
              onChange={formik.handleChange}
            />
          }
          label='I agree to the Terms of Service'
        />
        {formik.touched.agreeTerms && formik.errors.agreeTerms ? (
          <Typography color='error'>{formik.errors.agreeTerms}</Typography>
        ) : null}

        <FormControlLabel
          control={
            <Checkbox
              id='agreePrivacy'
              name='agreePrivacy'
              color='primary'
              checked={formik.values.agreePrivacy}
              onChange={formik.handleChange}
            />
          }
          label='I acknowledge that I have read and understand the Privacy Policy'
        />
        {formik.touched.agreePrivacy && formik.errors.agreePrivacy ? (
          <Typography color='error'>{formik.errors.agreePrivacy}</Typography>
        ) : null}

        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={!formik.isValid || !formik.dirty}
        >
          Create Account
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2'>
            Already have an account?{' '}
            <Link href='/login' variant='body2'>
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignUpForm;
