import { Box, Flex, Text, Spacer, Heading } from '@chakra-ui/react';
import { ClubListItem } from '../molecules/ClubListItem';
import { BsPlusCircle } from 'react-icons/bs';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';

export const MyClubsPanel = ({ clubs }) => {
  const ClubsList = () =>
    clubs.map((club) => {
      return <ClubListItem key={club.id} club={club} />;
    });

  const CreateNewClubItem = () => (
    <RouterLink to={route.newClub()}>
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
        <Box>
          <BsPlusCircle size={40} />
        </Box>
        <Spacer />
        <Text>Create a new club</Text>
      </Flex>
    </RouterLink>
  );
  return (
    <Flex direction="column">
      <Heading size={'lg'} mb={2}>
        My Clubs
      </Heading>
      <ClubsList />
      <CreateNewClubItem />
    </Flex>
  );
};
