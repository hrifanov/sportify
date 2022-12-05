import { Flex, Spinner } from '@chakra-ui/react';
import { MainSection } from 'src/shared/core/atoms/MainSection';

export const FullPageSpinner = ({ loading = true }) => {
  if (!loading) return;

  return (
    <MainSection>
      <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
        <Spinner />
      </Flex>
    </MainSection>
  );
};
