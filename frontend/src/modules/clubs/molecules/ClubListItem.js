import { Box, Flex, Text, Image, Spacer } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';

export const ClubListItem = (club) => {
  club = club.club;
  return (
    <RouterLink to={route.clubDetail(club.id)}>
      <Flex
        direction="row"
        align="center"
        border="1px"
        borderRadius={8}
        px={4}
        py={2}
        my={2}
        h={20}
        color="brand.font"
      >
        <Text>{club.name}</Text>
        <Spacer />
        <Box>
          <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            boxSize="50px"
            borderRadius="50%"
          />
        </Box>
      </Flex>
    </RouterLink>
  );
};
