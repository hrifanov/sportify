import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { formatTimer } from 'src/utils/date';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';

export const MatchTimer = (args) => {
  const { isPast, isPaused, timer, toggleTimer } = useInteractiveMatchStore();
  if (isPast) return;

  return (
    <Flex {...args} align={'center'} justify={'center'} gap={2} mb={1}>
      <IconButton
        aria-label={'Timer'}
        icon={<Icon as={isPaused ? MdPlayArrow : MdPause} boxSize={{ base: 8, md: 10 }} />}
        mt={1}
        variant={'ghost'}
        onClick={toggleTimer}
      />
      <Text fontSize={{ base: 'xl', md: '2xl' }} lineHeight={1}>
        {formatTimer(timer)}
      </Text>
    </Flex>
  );
};
