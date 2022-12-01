import { Box, Flex, Text } from '@chakra-ui/react';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';

export const MatchDetailEvents = ({ events, readonly = false }) => {
  return (
    <Box
      bg={'brand.boxBackground'}
      py={6}
      px={14}
      mt={1}
      h={'full'}
      borderRadius={'base'}
      flexGrow={1}
      minHeight={0}
    >
      <Flex direction={'column'} overflowY={'scroll'} height={'100%'}>
        {!!events.length ? (
          <>
            {events.map((event) => (
              <MatchEvent key={event.id} event={event} readonly={readonly} />
            ))}
            <Box borderBottom={'1px solid #9FB2D1'} />
          </>
        ) : (
          <Text textColor={'brand.secondary'} fontSize={'xl'} m={'auto'}>
            Add some events
          </Text>
        )}
      </Flex>
    </Box>
  );
};
