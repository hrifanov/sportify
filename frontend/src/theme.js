import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      primary: '#FB7143',
      secondary: '#969AB9',
      dark: '#1F2833',
      boxBackground: '#283555',
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
      PopoverArrow: {
        bg: '#1F2833',
        color: 'white',
      },
      header: {
        bg: 'brand.boxBackground',
      },
    },
  },
  components: {
    Input: {
      variants: {
        default: {
          field: {
            background: 'white',
            color: 'brand.dark',
          },
        },
      },
      defaultProps: {
        variant: 'default',
      },
    },
    Button: {
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            _disabled: {
              bg: 'brand.primary',
            },
          },
        },
        gray: {
          bg: 'gray.500',
          color: 'white',
          _hover: {
            bg: 'gray.600',
          },
        },
        ghost: {
          _hover: {
            bg: 'rgba(255,255,255,0.1)',
          },
          _focus: {
            bg: 'rgba(255,255,255,0.2)',
          },
        },
        outline: {
          bg: 'transparent',
          borderColor: 'white',
          color: 'white',
          _hover: {
            color: 'brand.dark',
          },
        },
      },
    },
  },
});
