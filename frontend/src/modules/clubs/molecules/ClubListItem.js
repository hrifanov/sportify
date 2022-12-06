import { Box, Flex, Text, Image, Spacer, Stack, Button } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { ClubLogo } from 'src/modules/clubs/atoms/ClubLogo';
import { useNavigate } from 'react-router-dom';
import { useClubStore } from 'src/modules/clubs/store/clubStore';

export const ClubListItem = ({ club, joinable }) => {
  const navigate = useNavigate();
  const { selectClub } = useClubStore();

  function onSelect() {
    selectClub(club);
    navigate(route.clubDetail(club.id));
  }

  return (
    <button onClick={onSelect} width="100%">
      <Flex
        direction="row"
        align="center"
        border="1px"
        borderRadius={8}
        px={4}
        py={2}
        my={2}
        h={24}
        color="brand.font"
      >
        <Box mr={2}>
          <ClubLogo club={club} size={50} />
        </Box>
        <Flex direction="column" align="flex-start" textAlign="left" w="100%">
          <Text fontWeight="600">{club.name}</Text>
          <Text fontSize="12px" color="brand.secondary">
            {club.locality}
          </Text>
          <Text fontSize="12px" color="brand.secondary">
            {club.sport}
          </Text>
        </Flex>
        {joinable && (
          <Button
            size="sm"
            bg="brand.title"
            variant="filled"
            _hover={{
              bg: 'brand.secondary',
            }}
          >
            Join
          </Button>
        )}
      </Flex>
    </button>
  );
};
