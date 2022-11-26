import { useEffect } from 'react';
import React from 'react';

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
  IconButton,
  Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { FiPlus, FiXCircle } from 'react-icons/fi';
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
import { players } from 'src/modules/clubs/players';

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

  const date = new Date().toISOString().split('T')[0];

  const [gameDate, setGameDate] = useState(date);

  const [openPlayers, setOpenPlayers] = useState(false);

  const handleOpenPlayers = () => {
    setOpenPlayers(true);
  };

  const handleClosePlayers = () => {
    setOpenPlayers(false);
  };

  const [value, setValue] = React.useState('2');

  const Players = () =>
    club?.players.map((item, itemIndex) => {
      return (
        <Stack justifyContent="space-between" direction="row" key={item.id} p={1}>
          <Text>{item.name}</Text>
          <RadioGroup
            onChange={(setValue, (e) => handleSelected(e, itemIndex, columns, setColumns))}
            value={value}
          >
            <Stack direction="row">
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      );
    });

  /*const [checkedState, setCheckedState] = useState(new Array().fill(false)); //fill array with column items in new Array

  const handleChecked = (e, index) => {
    if (e.target.checked) {
      console.log(index);
    } else {
      console.log(columns[1]);
    }
    const updatedCheckedState = checkedState.map((item, i) => (i === index ? !item : item));

    setCheckedState(updatedCheckedState);
  };*/

  const handleSelected = (e, index, columns, setColumns) => {
    if (value === '2') {
      const sourceColumn = columns[1];
      const destColumn = columns[0];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(index, 1);
      destItems.splice(index, 0, removed);
      console.log(index);
      console.log(removed);
      setColumns({
        ...columns,
        0: {
          ...destColumn,
          items: destItems,
        },
        1: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    }
    if (value === '2') {
      const sourceColumn = columns[0];
      const destColumn = columns[1];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(index, 1);
      destItems.splice(index, 0, removed);
      setColumns({
        ...columns,
        0: {
          ...destColumn,
          items: destItems,
        },
        1: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
    }
  };

  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Create a match" />
      <Container maxW="container.xl" h="full" minHeight={0} my={[2, 3, 5]} position="relative">
        {openPlayers ? (
          <Box
            position="absolute"
            bg="brand.title"
            zIndex={10}
            left={0}
            right={0}
            top={0}
            bottom={0}
            w={400}
            m="auto"
            px={5}
            pt={10}
            pb={5}
            borderRadius="base"
          >
            <IconButton
              mt={-10}
              mr={-5}
              bg="brand.title"
              aria-label="Save column name"
              size="md"
              icon={<FiXCircle />}
              float="right"
              onClick={handleClosePlayers}
            />
            <Players />
          </Box>
        ) : null}
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
                            position="relative"
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
                                            defaultValue="attack"
                                            onChange={(selectedOption) => {
                                              const modifiedColumns = [...Object.values(columns)];
                                              modifiedColumns[columnIndex].items[itemIndex] = {
                                                ...column.items[itemIndex],
                                                role: selectedOption.target.value,
                                              };
                                              setColumns(modifiedColumns);
                                            }}
                                          >
                                            <option
                                              style={{ backgroundColor: '#283555', color: 'white' }}
                                              value="attack"
                                            >
                                              Attacker
                                            </option>
                                            <option
                                              style={{ backgroundColor: '#283555', color: 'white' }}
                                              value="goalkeeper"
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
              <Button
                height={100}
                width={100}
                borderRadius="50%"
                onClick={handleOpenPlayers}
                color="brand.dark"
                fontSize={64}
                _hover={{
                  bg: 'brand.dark',
                  color: 'brand.secondary',
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                bottom={0}
                mx="auto"
                left={0}
                right={0}
              >
                <FiPlus />
              </Button>
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
                role: item.role ? item.role : 'attack',
              }));
              const teamPlayers2 = columns[2].items.map((item) => ({
                user: item.id,
                role: item.role ? item.role : 'attack',
              }));

              const matchInput = {
                club: club.id,
                date: gameDate,
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
