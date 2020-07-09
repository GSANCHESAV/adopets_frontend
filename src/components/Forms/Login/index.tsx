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
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { themeValues } from '../../../styles/theme';
import { useAuth } from '../../../hooks/auth';

const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);

  const handleShowPassword = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({
      email,
      password,
    });
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
            Enter your email and password to log in
          </Typography>
        </Grid>
        <Grid item>
          <form noValidate>
            <Box mt={3}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                  label="Password"
                  type={visibility ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={EndAdornmentComponent}
                />
              </FormControl>
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
                Login
              </Button>

              <Box mt={3}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>Do not have an account?</Typography>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/register"
                      style={{
                        textDecoration: 'none',
                        fontSize: 16,
                        fontWeight: 600,
                        color: themeValues.palette.primary.main,
                      }}
                    >
                      Sign Up
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

export default LoginForm;
