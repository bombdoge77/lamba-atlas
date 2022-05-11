import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#058ED9',
        light2: '#e8f5e9',
        white: '#FFFFFF',
        black: '#000000'
      },
      secondary: {
        main: '#EA9915',
      },
      text: {
        disabled: 'black'
      }, 
    },
    typography: {
      subtitle3: {
        color:'rgba(0, 0, 0, 0.6);', 
        fontSize:'1rem',
        fontWeight: 400,
      },
    },
  });

export default theme;