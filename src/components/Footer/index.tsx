import React, { memo } from 'react';

import { Container, Grid, Box, Link, IconButton } from '@material-ui/core';
import { Instagram, Facebook, Twitter } from '@material-ui/icons';

import Logo from '../../assets/img/logo-white.png';

const Footer: React.FC = () => {
  return (
    <Box
      bgcolor="secondary.main"
      pt={6}
      pb={12}
      style={{
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <img src={Logo} alt="company logo" height="auto" width="96px" />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="Instagram Link"
                  rel="noopener noreferrer"
                  target="_blank"
                  component={Link}
                  href="https://www.instagram.com/adopets_us/"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Facebook Link"
                  rel="noopener noreferrer"
                  target="_blank"
                  component={Link}
                  href="https://www.facebook.com/adopetsUS/"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Twitter Link"
                  rel="noopener noreferrer"
                  target="_blank"
                  component={Link}
                  href="https://twitter.com/adopetsus"
                >
                  <Twitter />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(Footer);
