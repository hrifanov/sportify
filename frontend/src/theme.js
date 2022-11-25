import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      primary: '#FB7143',
      secondary: '#9FB2D1',
      title: '#969AB9',
      dark: '#1F2833',
      boxBackground: '#283555',
      font: 'white',
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
      option: {
        color: 'black',
      },
      PopoverArrow: {
        bg: '#1F2833',
        color: 'white',
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
      baseStyle: {
        cursor: 'pointer',
      },
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
        light: {
          bg: '#3E4A66',
          color: 'white',
        },
        popup: {
          bg: 'brand.boxBackground',
          color: 'white',
          _hover: {
            bg: 'brand.boxBackground',
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
    Table: {
      parts: ['td'],
      baseStyle: {
        td: {
          borderColor: 'brand.boxBackground',
        },
      },
      variants: {
        base: {
          thead: {},
          th: {
            position: 'sticky',
            top: 0,
            bg: 'brand.boxBackground',
            borderBottom: '1px solid #9FB2D1',
            textAlign: 'center',
          },
          td: {
            borderBottom: '1px solid #9FB2D1',
            textAlign: 'center',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'brand.boxBackground',
        },
      },
    },
    Select: {
      baseStyle: {},
    },
  },
});
