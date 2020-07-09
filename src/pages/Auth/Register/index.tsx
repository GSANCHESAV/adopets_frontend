import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../../../components/Header';
import RegisterForm from '../../../components/Forms/Register';
import Footer from '../../../components/Footer';
import ContainerApp from '../components/ContainerApp';

const Register: React.FC = () => {
  return (
    <ContainerApp>
      <Header />
      <Container component="main" maxWidth="xs">
        <RegisterForm />
      </Container>
      <Footer />
    </ContainerApp>
  );
};

export default Register;
