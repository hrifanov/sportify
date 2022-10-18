import { chakra } from '../system';

export function TransparentButton({ ...rest }) {
  return (
    <chakra.button
      display="flex"
      alignItems="center"
      color="gray.600"
      fontSize="sm"
      px="3"
      py="1.5"
      _hover={{ color: 'gray.400' }}
      {...rest}
    />
  );
}
