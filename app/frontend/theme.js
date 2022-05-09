import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#66bb6a',
        light2:'#e8f5e9'
      },
      secondary: {
        main: '#85bcff',
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