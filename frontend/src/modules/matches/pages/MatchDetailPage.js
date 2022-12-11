import { useMutation, useQuery } from '@apollo/client';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FETCH_MATCH } from 'src/modules/matches/apollo/queries';
import { MatchDetailHeading } from 'src/modules/matches/molecules/MatchDetailHeading';
import { MainSection } from 'src/shared/core/atoms/MainSection';
import { MatchDetailEvents } from 'src/modules/matches/molecules/MatchDetailEvents';
import { populateEvents } from 'src/utils/match';
import { Box, Button, Flex, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';
import { route } from 'src/Routes';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';
import { useClubStore } from 'src/modules/clubs/store/clubStore';
import Statistics from 'src/modules/matches/molecules/Statistics';
import { RoleEnum } from 'src/modules/matches/enums';
import { useConfirmAlertStore } from 'src/shared/core/confirmAlertStore';
import { REMOVE_MATCH_MUTATION } from 'src/modules/matches/apollo/mutations';

export const MatchDetailPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { loading, data } = useQuery(FETCH_MATCH, {
    variables: { matchId: id },
  });
  const [removeMatchRequest] = useMutation(REMOVE_MATCH_MUTATION);
  const { openConfirm } = useConfirmAlertStore();
  const [showStatistics, setShowStatistics] = useState(true);

  const { startInteractiveMatch } = useInteractiveMatchStore();
  const { activeClub } = useClubStore();

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!data) {
    return <Navigate to={route.clubDetail(activeClub.id)} />;
  }

  async function deleteMatch() {
    const deleted = await removeMatchRequest({
      variables: {
        matchId: id,
      },
    });
    if (deleted) {
      toast({
        title: 'Match deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(route.clubDetail(activeClub.id));
    }
  }
  function editMatch() {
    startInteractiveMatch({ match: data.match });
    navigate(route.matchInteractive());
  }

  return (
    <MainSection containerProps={{ maxW: 'container.lg' }}>
      {!loading && data && (
        <>
          <Flex direction={'column'} height={'100%'}>
            <MatchDetailHeading match={data.match} />
            <Flex
              bg={'brand.boxBackground'}
              py={3}
              px={14}
              mt={1}
              align={'center'}
              borderRadius={'base'}
            >
              <Box flex={1}>{data.match.season.name}</Box>
              <Flex gap={4} mx={'auto'}>
                <Button
                  size={'sm'}
                  variant={'outline'}
                  sx={!showStatistics ? { bg: 'white', color: 'black' } : {}}
                  onClick={() => setShowStatistics(false)}
                >
                  Events
                </Button>
                <Button
                  size={'sm'}
                  variant={'outline'}
                  sx={showStatistics ? { bg: 'white', color: 'black' } : {}}
                  onClick={() => setShowStatistics(true)}
                >
                  Statistics
                </Button>
              </Flex>
              <Box flex={1}></Box>
            </Flex>
            {!showStatistics && (
              <MatchDetailEvents events={populateEvents(data.match)} readonly={true} />
            )}
            {showStatistics && (
              <Flex
                direction={'column'}
                mt={1}
                flexGrow={1}
                minHeight={0}
                py={6}
                px={{ base: 2, md: 14 }}
                pl={{ base: 4 }}
                bg={'brand.boxBackground'}
                gap={10}
                overflowY={'scroll'}
              >
                <Box>
                  <Text>Attackers</Text>
                  <Statistics
                    statistics={data.match.statistics}
                    match={data.match}
                    role={RoleEnum.ATTACK}
                  />
                </Box>

                <Box>
                  <Text>Goalkeepers</Text>
                  <Statistics
                    statistics={data.match.statistics}
                    match={data.match}
                    role={RoleEnum.GOALKEEPER}
                  />
                </Box>
              </Flex>
            )}
            <Box bg={'brand.boxBackground'} py={3} px={14} mt={1} borderRadius={'base'}>
              <Flex>
                <Button
                  size={'sm'}
                  colorScheme={'red'}
                  onClick={() =>
                    openConfirm({
                      title: 'Do you really want to delete this match?',
                      variant: 'danger',
                      callback: deleteMatch,
                    })
                  }
                  mr={3}
                >
                  Delete match
                </Button>
                <Button size={'sm'} variant={'outline'} onClick={editMatch}>
                  Edit match
                </Button>
                <Spacer />
                <Button
                  size={'sm'}
                  variant={'primary'}
                  onClick={() => navigate(route.clubDetail(activeClub.id))}
                >
                  Take me home
                </Button>
              </Flex>
            </Box>
          </Flex>
        </>
      )}
    </MainSection>
  );
};
