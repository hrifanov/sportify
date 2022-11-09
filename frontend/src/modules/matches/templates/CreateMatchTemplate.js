import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Text, Spinner, Stack, Heading } from '@chakra-ui/react';
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
import { useState } from 'react';
import { teamsColumns } from '../teamsColumns';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function CreateMatchTemplate({ club, loading }) {
  const [columns, setColumns] = useState(teamsColumns);
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
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Flex
                    key={column.id}
                    direction="column"
                    w="full"
                    h="full"
                    bg="brand.boxBackground"
                    borderRadius="base"
                    py={4}
                    px={5}
                  >
                    <Heading size="md" align="middle" mb={4}>
                      {column.name}
                    </Heading>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            bg={snapshot.isDraggingOver ? 'brand.secondary' : 'brand.boxBackground'}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={'' + item.id} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        bg={
                                          snapshot.isDragging ? 'brand.dark' : 'brand.boxBackground'
                                        }
                                        px={2}
                                        py={2}
                                        _hover={{
                                          background: 'brand.dark',
                                        }}
                                      >
                                        {item.name}
                                      </Box>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </Box>
                        );
                      }}
                    </Droppable>
                  </Flex>
                );
              })}
            </DragDropContext>
          </Stack>
        )}
      </Container>
    </Flex>
  );
}
