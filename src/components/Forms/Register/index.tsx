import React, { useState, useMemo, useCallback } from 'react';
import {
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { themeValues } from '../../../styles/theme';

const RegisterForm: React.FC = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [visibility, setVisibility] = useState(false);

  const handleShowPassword = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  const handleCloseAlert = useCallback(() => {
    setRegisterSuccess(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post('users', {
      username,
      email,
      password,
    });

    if (response.data) {
      setRegisterSuccess(true);
    }
  };

  const EndAdornmentComponent = useMemo(() => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
          edge="end"
        >
          {visibility ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  }, [visibility, handleShowPassword]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Box pt={4.5} pb={6}>
        <Grid item>
          <Typography component="h1" variant="h6">
            Fill out the form to create your account
          </Typography>
        </Grid>
        <Grid item>
          <Box mt={1.5}>
            <Collapse in={registerSuccess}>
              <Alert severity="success" onClose={handleCloseAlert}>
                Account create success!
              </Alert>
            </Collapse>
          </Box>
        </Grid>
        <Grid item>
          <form noValidate>
            <Box mt={1.5}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                required
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password  "
                  type={visibility ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={EndAdornmentComponent}
                />
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password_confirmation"
                label="Password confirmation"
                name="Password Confirmation"
                type={visibility ? 'text' : 'password'}
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </Box>

            <Box mt={4.5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                onClick={handleSubmit}
              >
                Register
              </Button>

              <Box mt={3}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>Already have an account?</Typography>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/login"
                      style={{
                        textDecoration: 'none',
                        fontSize: 16,
                        fontWeight: 600,
                        color: themeValues.palette.primary.main,
                      }}
                    >
                      {' '}
                      Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        </Grid>
      </Box>
    </Grid>
  );
};

export default RegisterForm;
