import React from 'react';
import Layout from '@/components/layout/Layout';
import SignUpForm from '@/features/auth/components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <Layout title='Sign Up'>
      <SignUpForm />
    </Layout>
  );
};

export default SignUpPage;
