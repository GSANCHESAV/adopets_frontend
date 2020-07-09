import { createMuiTheme } from '@material-ui/core/styles';

export const themeValues = {
  palette: {
    primary: {
      light: '#F6B6CC',
      main: '#e52e6b',
    },
    secondary: {
      main: '#18254c',
    },
    text: {
      primary: 'rgb(36, 55, 78)',
    },
  },
};

export const theme = createMuiTheme(themeValues);
