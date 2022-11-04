import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Text, Spinner, Stack } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiSettings } from 'react-icons/fi';
import { players } from 'src/modules/clubs/players';
import {
  RoleAttackerIcon,
  RoleDefenderIcon,
  RoleGoalKeeperIcon,
} from 'src/shared/design-system/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ProvidedRequiredArgumentsRule } from 'graphql';

export default function CreateMatchTemplate({ club, loading }) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  };
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Club detail" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {club && (
          <Stack spacing={5} direction="row">
            <DragDropContext onDragEnd={onDragEnd}>
              <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
                <Droppable droppableId="team1">
                  {(provided) => (
                    <Flex
                      direction="column"
                      w="full"
                      h="full"
                      bg="brand.boxBackground"
                      borderRadius="base"
                      py={4}
                      px={5}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {provided.placeholder}
                    </Flex>
                  )}
                </Droppable>
              </Box>
              <Droppable droppableId="players">
                {(provided) => (
                  <Flex
                    direction="column"
                    w="full"
                    h="full"
                    bg="brand.boxBackground"
                    borderRadius="base"
                    py={4}
                    px={5}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {[...players, ...players].map((player, i) => (
                      <Draggable key={i} draggableId={'' + i} index={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{player.name}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>
              <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
                <Droppable droppableId="team2">
                  {(provided) => (
                    <Flex
                      direction="column"
                      w="full"
                      h="full"
                      bg="brand.boxBackground"
                      borderRadius="base"
                      py={4}
                      px={5}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {provided.placeholder}
                    </Flex>
                  )}
                </Droppable>
              </Box>
            </DragDropContext>
          </Stack>
        )}
      </Container>
    </Flex>
  );
}
