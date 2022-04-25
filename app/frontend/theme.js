import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#66bb6a',
      },
      secondary: {
        main: '#85bcff',
      },
      text: {
        disabled: 'black'
      }
    },
  });

export default theme;