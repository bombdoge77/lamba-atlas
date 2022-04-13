import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#bd6de2',
      },
      secondary: {
        main: '#92e26d',
      },
      text: {
        disabled: 'black'
      }
    },
  });

export default theme;