import { Icon as ChakraIcon } from '@chakra-ui/react';
import { forwardRef, keyframes } from '../system';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const Icon = forwardRef(function Icon(
  { isSpinning = false, ...restProps },
  ref,
) {
  return (
    <ChakraIcon
      ref={ref}
      {...restProps}
      animation={isSpinning ? `${spin} 2s linear infinite` : undefined}
    />
  );
});
