
import { createTheme } from '@mui/material/styles';
import PopinRegular from '../Assets/font/Poppins-Regular.ttf';
const popinFont = {
  fontFamily: 'Popin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Popin Regular'),
    url(${PopinRegular}) format('truetype')
  `,
};

export default createTheme({
  typography: {
    fontFamily: 'Popin,',
    // ...
  },
  
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [popinFont],
      },
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
    light: {
      main: '#596CF7',
      color: '#FFFFFF'
    },
    // error: {
    //   main: "#19857b",
    // },
    background: {
      default: '#fff',
    },
  },
});