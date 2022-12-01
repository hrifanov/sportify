import { useQuery } from '@apollo/client';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FETCH_MATCH } from 'src/modules/matches/apollo/queries';
import { MatchDetailHeading } from 'src/modules/matches/molecules/MatchDetailHeading';
import { MainSection } from 'src/shared/core/atoms/MainSection';
import { MatchDetailEvents } from 'src/modules/matches/molecules/MatchDetailEvents';
import { populateEvents } from 'src/utils/match';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';
import { route } from 'src/Routes';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';

export const MatchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useQuery(FETCH_MATCH, {
    variables: { matchId: id },
  });
  const [showStatistics, setShowStatistics] = useState(false);

  const { startInteractiveMatch } = useInteractiveMatchStore();

  if (!loading && !data) {
    return <Navigate to={route.clubDetail()} />;
  }

  function editMatch() {
    startInteractiveMatch(data.match);
    navigate(route.matchInteractive());
  }

  return (
    <MainSection containerProps={{ maxW: 'container.lg' }}>
      <FullPageSpinner loading={loading} />
      {data && (
        <>
          <Flex direction={'column'} height={'100%'} pb={10}>
            <MatchDetailHeading match={data.match} />
            <Flex
              bg={'brand.boxBackground'}
              py={3}
              px={14}
              mt={1}
              gap={4}
              justify={'center'}
              borderRadius={'base'}
            >
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
            {!showStatistics && (
              <MatchDetailEvents events={populateEvents(data.match)} readonly={true} />
            )}
            <Box bg={'brand.boxBackground'} py={3} px={14} mt={1} borderRadius={'base'}>
              <Flex>
                <Button size={'sm'} variant={'outline'} onClick={editMatch}>
                  Edit match
                </Button>
                <Spacer />
                <Button
                  size={'sm'}
                  variant={'primary'}
                  onClick={() => navigate(route.clubDetail())}
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
