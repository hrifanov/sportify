import AppHeader from 'src/shared/core/organisms/AppHeader';
import {
  Box,
  Container,
  Flex,
  Button,
  Spinner,
  Stack,
  HStack,
  Input,
  useNumberInput,
  InputGroup,
  InputRightAddon,
  IconButton,
} from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { RouterLink } from 'src/shared/navigation';
import { players } from 'src/modules/clubs/players';
import {
  RoleAttackerIcon,
  RoleDefenderIcon,
  RoleGoalKeeperIcon,
} from 'src/shared/design-system/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { teamsColumns } from '../teamsColumns';
import EditableHeading from 'src/shared/design-system/molecules/EditableHeading';

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

  const [listOfTasks, setTasks] = useState(teamsColumns);
  const handleChange = (e, index) => {
    const value = e.target.value;
    console.log(value);
    console.log(index);
    setTasks((state) => [
      ...state.slice(0, index),
      { ...state[index], name: value },
      ...state.slice(index + 1),
    ]);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    defaultValue: 60 + 'min',
    min: 1,
    max: 180,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Create a match" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {club && (
          <Stack spacing={5} direction="row" h="full">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(listOfTasks).map(([columnId, column], index) => {
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
                    style={{ overflow: 'scroll' }}
                  >
                    <EditableHeading
                      key={column.id}
                      onChange={(e) => handleChange(e, index)}
                      name={column.name}
                    />
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            bg={snapshot.isDraggingOver ? 'brand.secondary' : 'brand.boxBackground'}
                            h="full"
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
      <Container mb={5} maxW="container.xl">
        <Stack direction={['column', 'row']} spacing={10} justifyContent="center">
          <HStack maxW="320px">
            <label className="label-nowrap" htmlFor="game-time">
              Game time:
            </label>
            <Button {...inc} color="brand.secondary">
              +
            </Button>
            <InputGroup id="game-time">
              <Input {...input} color="brand.secondary" />
              <InputRightAddon children="min" bg="white" color="brand.secondary" />
            </InputGroup>
            <Button {...dec} color="brand.secondary">
              -
            </Button>
          </HStack>
          <HStack>
            <label className="label-nowrap" htmlFor="date-of-match">
              Date of the match:
            </label>
            <Input
              id="date-of-match"
              color="brand.secondary"
              placeholder="Select Date"
              size="md"
              type="date"
              w={300}
            />
          </HStack>
          <Button variant="primary" onClick={() => console.log(columns[2].items)} w={40}>
            Start match
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}
