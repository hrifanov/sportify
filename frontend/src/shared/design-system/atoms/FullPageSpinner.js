import { Flex, Spinner } from '@chakra-ui/react';

export const FullPageSpinner = ({ loading }) => {
  if (!loading) return;

  return (
    <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  );
};
