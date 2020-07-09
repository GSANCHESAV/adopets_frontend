import React, { useState, useCallback, memo } from 'react';

import {
  AppBar,
  Container,
  Button,
  Grid,
  Box,
  Hidden,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import { useAuth } from '../../hooks/auth';

interface ListNavItemProps {
  label: string;
  address: string;
}

const ListItemNav = ({ label, address }: ListNavItemProps) => {
  return (
    <ListItem
      button
      component={NavLink}
      to={address}
      activeStyle={{
        opacity: 0.28,
      }}
    >
      <ListItemText primary={label} />
    </ListItem>
  );
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { signed, signOut } = useAuth();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const HeaderRightDesktop = memo(() => {
    if (signed) {
      return (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={signOut}
          size="small"
        >
          Sign Out
        </Button>
      );
    }
    return (
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            component={NavLink}
            to="/login"
            disableElevation
            activeStyle={{
              opacity: 0.28,
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            component={NavLink}
            to="/register"
            disableElevation
            activeStyle={{
              opacity: 0.28,
            }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    );
  });

  const HeaderRightMobile = memo(() => {
    if (signed) {
      return (
        <ListItem button onClick={signOut}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      );
    }
    return (
      <>
        <ListItemNav label="Login" address="/login" />
        <ListItemNav label="Sign Up" address="/register" />
      </>
    );
  });

  return (
    <AppBar
      component="header"
      position="relative"
      elevation={0}
      style={{ backgroundColor: '#fff', borderBottom: `1px solid #eceef1` }}
    >
      <Box pt={4} pb={4}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <img src={Logo} alt="company logo" height="auto" width="96px" />
            </Grid>
            <Grid item>
              <Hidden xsDown>
                <HeaderRightDesktop />
              </Hidden>
              <Hidden smUp>
                <IconButton
                  onClick={handleOpen}
                  aria-label="open menu"
                  color="secondary"
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  anchor="right"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                >
                  <List style={{ width: 250 }}>
                    <HeaderRightMobile />
                    <Divider />
                  </List>
                </SwipeableDrawer>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
