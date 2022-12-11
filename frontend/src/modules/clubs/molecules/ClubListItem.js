import { Box, Flex, Text, Image, Spacer, Stack, Button } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { ClubLogo } from 'src/modules/clubs/atoms/ClubLogo';
import { useNavigate } from 'react-router-dom';
import { useClubStore } from 'src/modules/clubs/store/clubStore';
import { CREATE_APLICATION_MUTATION } from '../apollo/mutations';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';

export const ClubListItem = ({ club, joinable, userId }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { selectClub } = useClubStore();

  function onSelect() {
    selectClub(club);
    navigate(route.clubDetail(club.id));
  }

  const [showJoinConfirm, setShowJoinConfirm] = useState(false);
  const JoinConfirm = () => (
    <Stack
      position="absolute"
      w="300px"
      h="200px"
      zIndex={100}
      bg="brand.title"
      margin="auto"
      left={0}
      right={0}
      top={0}
      bottom={0}
      borderRadius="base"
      p={4}
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" mb={2}>
        Do you really want to join {club.name}?
      </Text>
      <Stack direction="row">
        <Button
          size="sm"
          colorScheme="orange"
          bg="brand.primary"
          variant="filled"
          _hover={{
            bg: 'brand.primary',
          }}
          onClick={() => {
            handleApplication(userId, club.id);
            setShowJoinConfirm(false);
          }}
        >
          Yes
        </Button>
        <Button
          size="sm"
          bg="brand.secondary"
          variant="filled"
          _hover={{
            bg: 'brand.secondary',
          }}
          onClick={() => {
            setShowJoinConfirm(false);
          }}
        >
          No
        </Button>
      </Stack>
    </Stack>
  );

  const [createApplicationRequest, createApplicationRequestState] = useMutation(
    CREATE_APLICATION_MUTATION,
    {
      onCompleted: () => {},
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const handleApplication = useCallback(
    (userId, clubId) => {
      const variables = { userId, clubId };
      createApplicationRequest({ variables });
      toast({
        title: 'Application has been sent',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    },
    [createApplicationRequest, toast],
  );

  return (
    <Box w="100%">
      {!joinable ? (
        <Box onClick={onSelect} cursor="pointer" width="100%">
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
          </Flex>
        </Box>
      ) : (
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
          <Button
            size="sm"
            bg="brand.title"
            variant="filled"
            _hover={{
              bg: 'brand.secondary',
            }}
            onClick={() => {
              setShowJoinConfirm(true);
            }}
          >
            Join
          </Button>
        </Flex>
      )}
      {showJoinConfirm ? <JoinConfirm /> : null}
    </Box>
  );
};
