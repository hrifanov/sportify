import { Box, Flex, Text, Image, Spacer } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { ClubLogo } from 'src/modules/clubs/atoms/ClubLogo';
import { useNavigate } from 'react-router-dom';
import { useClubStore } from 'src/modules/clubs/store/clubStore';

export const ClubListItem = (club) => {
  club = club.club;
  const navigate = useNavigate();
  const { selectClub } = useClubStore();

  function onSelect() {
    selectClub(club);
    navigate(route.clubDetail(club.id));
  }

  return (
    <button onClick={onSelect}>
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
          <ClubLogo club={club} size={50} />
        </Box>
      </Flex>
    </button>
  );
};
