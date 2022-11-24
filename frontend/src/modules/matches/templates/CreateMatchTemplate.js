import { useEffect } from 'react';

import AppHeader from 'src/shared/core/organisms/AppHeader';
import {
  Box,
  Container,
  Flex,
  Button,
  Spinner,
  Stack,
  Input,
  useNumberInput,
  InputGroup,
  InputRightAddon,
  Text,
  Select,
} from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { teamsColumns } from '../teamsColumns';
import EditableHeading from 'src/shared/design-system/molecules/EditableHeading';
import { useMutation } from '@apollo/client';
import { CREATE_MATCH_MUTATION } from '../apollo/mutations';
import {
  startInteractiveMatch,
  useInteractiveMatchClient,
} from 'src/modules/matches/apollo/interactiveMatchClient';

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
  const [createMatchRequest, createMatchRequestState] = useMutation(CREATE_MATCH_MUTATION, {
    onCompleted: () => {},
    onError: () => {},
  });

  const [columns, setColumns] = useState([]);

  const interactiveMatchClient = useInteractiveMatchClient();

  useEffect(() => {
    setColumns(teamsColumns(club?.players));
  }, [club]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    console.log(value);
    console.log(index);
    setColumns((state) => [
      ...Object.values(state).slice(0, index),
      { ...state[index], name: value },
      ...Object.values(state).slice(index + 1),
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

  //const [isAttacker, setIsAttacker] = useState('outline');
  const date = new Date().toISOString().split('T')[0];

  const [gameDate, setGameDate] = useState(date);
  console.log(teamsColumns(club?.players));
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Create a match" />
      <Container maxW="container.xl" h="full" minHeight={0} my={[2, 3, 5]}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {club && (
          <Stack spacing={[2, 3, 5]} direction={['column', null, 'row']} h="full">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(columns).map(([columnId, column], columnIndex) => {
                return (
                  <Stack
                    key={column.id}
                    direction="column"
                    w="full"
                    h="full"
                    bg="brand.boxBackground"
                    borderRadius="base"
                    py={[2, 2, 4]}
                    px={[2, 2, 5]}
                    style={{ overflow: 'scroll' }}
                    spacing={[1, 2, 2]}
                    maxH={['375px', '625px', '100%']}
                    pl={[2, 2, 5]}
                  >
                    <EditableHeading
                      key={column.id}
                      onChange={(e) => handleChange(e, columnIndex)}
                      name={column.name}
                    />
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            bg={snapshot.isDraggingOver ? 'brand.title' : 'brand.boxBackground'}
                            h="full"
                          >
                            {column.items?.map((item, itemIndex) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={'' + item.id}
                                  index={itemIndex}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        bg={snapshot.isDragging ? 'brand.dark' : 'brand.dark'}
                                        px={[2, 3, 3]}
                                        py={3}
                                        _hover={{
                                          background: 'brand.title',
                                        }}
                                        mb={2}
                                        borderRadius="base"
                                        alignItems="center"
                                      >
                                        <Text>{item.name}</Text>
                                        {/*<HStack>
                                          <IconButton
                                            bg="brand.dark"
                                            _hover={{ bg: 'brand.secondary' }}
                                            aria-label="Set player role to attacker"
                                            size="sm"
                                            p={1}
                                            icon={<GiHockey />}
                                          />
                                          <IconButton
                                            variant={isAttacker}
                                            bg="brand.dark"
                                            _hover={{ bg: 'brand.secondary' }}
                                            aria-label="Set player role to goalkeeper"
                                            size="sm"
                                            p={1}
                                            icon={<RoleGoalKeeperIcon />}
                                            onClick={() => setIsAttacker('outline')}
                                          />
                                      </HStack>*/}
                                        <Stack spacing={3}>
                                          <Select
                                            bg="brand.boxBackground"
                                            variant="filled"
                                            colorScheme="brand.boxBackground"
                                            _hover={{
                                              bg: 'brand.dark',
                                              cursor: 'pointer',
                                            }}
                                            size="sm"
                                            // TODO: Does not work, need to refactor
                                            // onChange={(selectedOption) => {
                                            //   const modifiedColumns = [...columns];
                                            //   modifiedColumns[columnIndex].items[itemIndex] = {
                                            //     ...column.items[itemIndex],
                                            //     role: selectedOption.target.value,
                                            //   };

                                            //   setColumns(modifiedColumns);
                                            // }}
                                          >
                                            <option
                                              style={{ backgroundColor: '#283555' }}
                                              value="Attacker"
                                            >
                                              Attacker
                                            </option>
                                            <option
                                              style={{ backgroundColor: '#283555' }}
                                              value="Goalkeeper"
                                            >
                                              Goalkeeper
                                            </option>
                                          </Select>
                                        </Stack>
                                      </Stack>
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
                  </Stack>
                );
              })}
            </DragDropContext>
          </Stack>
        )}
      </Container>
      <Container mb={6} maxW="container.xl">
        <Stack
          direction={['column', 'column', 'row']}
          spacing={[3, 5, 10]}
          justifyContent="center"
          alignItems={'end'}
        >
          {/* <Stack maxW={['230px', '280px', '320px']}> */}
          {/*   <label className="label-nowrap" htmlFor="game-time"> */}
          {/*     Game time: */}
          {/*   </label> */}
          {/*   <Stack direction="row"> */}
          {/*     <Button {...inc} color="black"> */}
          {/*       + */}
          {/*     </Button> */}
          {/*     <InputGroup id="game-time"> */}
          {/*       <Input {...input} color="black" /> */}
          {/*       <InputRightAddon children="min" bg="white" color="brand.secondary" /> */}
          {/*     </InputGroup> */}
          {/*     <Button {...dec} color="black"> */}
          {/*       - */}
          {/*     </Button> */}
          {/*   </Stack> */}
          {/* </Stack> */}
          {/* <Stack> */}
          {/*   <label className="label-nowrap" htmlFor="date-of-match"> */}
          {/*     Date of the match: */}
          {/*   </label> */}
          {/*   <Input */}
          {/*     id="date-of-match" */}
          {/*     color="black" */}
          {/*     value={gameDate} */}
          {/*     size="md" */}
          {/*     type="date" */}
          {/*     w={['230px', '280px', '320px']} */}
          {/*     onChange={(event) => setGameDate(event.target.value)} */}
          {/*   /> */}
          {/* </Stack> */}
          <Button
            variant="primary"
            onClick={async () => {
              // transform data for request query
              const teamPlayers1 = columns[0].items.map((item) => ({
                user: item.id,
                role: 'attack',
              }));
              const teamPlayers2 = columns[2].items.map((item) => ({
                user: item.id,
                role: 'attack',
              }));

              const matchInput = {
                club: club.id,
                date: gameDate,
                //place: '', // TODO implement place input
                teams: {
                  home: {
                    name: columns[0].name,
                    teamPlayers: teamPlayers1,
                  },
                  guest: {
                    name: columns[2].name,
                    teamPlayers: teamPlayers2,
                  },
                },
              };
              const { data } = await createMatchRequest({ variables: { matchInput } });
              interactiveMatchClient.startInteractiveMatch(data.createMatch);
            }}
            w={60}
          >
            Start match
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}
