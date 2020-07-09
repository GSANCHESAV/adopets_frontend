import React from 'react';

import { Container } from '@material-ui/core';
import Header from '../../../components/Header';
import LoginForm from '../../../components/Forms/Login';
import Footer from '../../../components/Footer';
import ContainerApp from '../components/ContainerApp';

const Login: React.FC = () => {
  return (
    <ContainerApp>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        style={{ display: 'flex', flex: 1 }}
      >
        <LoginForm />
      </Container>
      <Footer />
    </ContainerApp>
  );
};

export default Login;
