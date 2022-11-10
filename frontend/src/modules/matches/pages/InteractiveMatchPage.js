import { MainSection } from 'src/shared/core/atoms/MainSection.js';
import { Avatar, Center, Flex, Grid, SimpleGrid, Text } from '@chakra-ui/react';

export const InteractiveMatchPage = () => {
  return (
    <MainSection containerProps={{ maxW: 'container.md' }}>
      <SimpleGrid columns={3} spacing={10} align={'center'}>
        <Flex align={'center'} gap={5}>
          <Text fontSize={'4xl'}>Team 1</Text>
          <Avatar name={'Team 1'} size={'lg'} bg={'brand.secondary'} />
        </Flex>
        <Flex direction={'column'} align={'center'}>
          <Text>Score</Text>
          <Text fontSize={'5xl'} fontWeight={'bold'} lineHeight={1}>
            1:0
          </Text>
          <Text mt={3} fontSize={'lg'}>
            10:43:02
          </Text>
        </Flex>
        <Flex align={'center'} gap={5} direction={'row-reverse'}>
          <Text fontSize={'4xl'}>Team 2</Text>
          <Avatar name={'Team 2'} size={'lg'} bg={'brand.secondary'} />
        </Flex>
      </SimpleGrid>
    </MainSection>
  );
};
