import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      primary: '#66FCF1',
      secondary: '#45A29E',
      dark: '#1F2833',
    },
    test: {
      50: 'red',
      500: 'red',
      900: '#171923',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#1F2833',
        color: 'white',
      },
      a: {
        color: 'brand.secondary',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'brand.dark',
        },
      },
    },
  },
});
