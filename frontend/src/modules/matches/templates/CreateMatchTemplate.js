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
  Switch,
  Radio,
  RadioGroup,
  Hide,
  HStack,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiXCircle,
  FiArrowRight,
  FiArrowLeft,
  FiArrowDown,
  FiArrowUp,
} from 'react-icons/fi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { teamsColumns } from '../teamsColumns';
import EditableHeading from 'src/shared/design-system/molecules/EditableHeading';
import { useMutation } from '@apollo/client';
import { CREATE_MATCH_MUTATION } from '../apollo/mutations';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';
import { useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';

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
  const navigate = useNavigate();
  const { startInteractiveMatch } = useInteractiveMatchStore();
  const [columns, setColumns] = useState([]);

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
  const [errorPopup, setErrorPopup] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [seasonId, setSeasonId] = useState(null);

  const handleOpenPlayers = () => {
    setOpenPlayers(true);
  };

  const handleClosePlayers = () => {
    setOpenPlayers(false);
  };

  const [value, setValue] = React.useState('1');

  const Players = () =>
    club?.players.map((item, itemIndex) => {
      return (
        <Stack justifyContent="space-between" direction="row" key={item.id} p={1}>
          <Text>{item.name}</Text>
          <Stack
            direction="row"
            onChange={(e) => handleSelected(e, itemIndex, columns, setColumns)}
          >
            <input type="radio" name={item.name} value="0" />
            <input type="radio" name={item.name} value="1" defaultChecked />
            <input type="radio" name={item.name} value="2" />
          </Stack>
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
    if (e.target.value === '0') {
      const sourceColumn = columns[1];
      const destColumn = columns[0];
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
    }
  };

  const handleLeftMove = (e, index, columns, setColumns, column) => {
    const sourceColumn = columns[column.id];
    const destColumn = columns[column.id - 1];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(index, 1);
    destItems.splice(index, 0, removed);
    setColumns({
      ...columns,
      [column.id - 1]: {
        ...destColumn,
        items: destItems,
      },
      [column.id]: {
        ...sourceColumn,
        items: sourceItems,
      },
    });
  };

  const handleRightMove = (e, index, columns, setColumns, column) => {
    const sourceColumn = columns[column.id];
    const destColumn = columns[column.id + 1];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(index, 1);
    destItems.splice(index, 0, removed);
    setColumns({
      ...columns,
      [column.id]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [column.id + 1]: {
        ...destColumn,
        items: destItems,
      },
    });
  };

  if (loading) {
    return <FullPageSpinner />;
  }

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
        {errorPopup ? (
          <Box
            position="absolute"
            bg="brand.title"
            zIndex={10}
            left={0}
            right={0}
            top="50%"
            bottom="50%"
            height={120}
            w={300}
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
              onClick={() => setErrorPopup(false)}
            />
            <Text textAlign="center">You need to have at least 2 players in each team</Text>
          </Box>
        ) : null}
        {club && (
          <Stack spacing={[2, 3, 5]} direction={['column', null, 'row']} h="full">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(columns).map(([columnId, column], columnIndex) => {
                return (
                  <Stack
                    key={column.id + 1}
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
                      key={column.id + 1}
                      onChange={(e) => handleChange(e, columnIndex)}
                      name={column.name}
                    />
                    <Droppable droppableId={columnId} key={columnId + 1}>
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
                                        flexWrap="wrap"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        bg={snapshot.isDragging ? 'brand.dark' : 'brand.dark'}
                                        px={[2, 3, 3]}
                                        py={3}
                                        _hover={{
                                          background: '#4C64A1',
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
                                        <Stack
                                          direction="row"
                                          w="100%"
                                          mt="8px !important"
                                          marginInlineStart="0 !important"
                                        >
                                          {column.id !== 0 ? (
                                            <Button
                                              bg="brand.secondary"
                                              variant="filled"
                                              colorScheme="brand.secondary"
                                              _hover={{
                                                bg: 'brand.dark',
                                                cursor: 'pointer',
                                              }}
                                              w="50%"
                                              size="sm"
                                              onClick={(e) =>
                                                handleLeftMove(
                                                  e,
                                                  itemIndex,
                                                  columns,
                                                  setColumns,
                                                  column,
                                                )
                                              }
                                            >
                                              <Stack direction="row">
                                                <Hide below="md">
                                                  <FiArrowLeft />
                                                </Hide>
                                                <Hide above="md">
                                                  <FiArrowUp />
                                                </Hide>
                                              </Stack>
                                            </Button>
                                          ) : null}
                                          {column.id !== 2 ? (
                                            <Button
                                              ml="auto"
                                              bg="brand.secondary"
                                              variant="filled"
                                              colorScheme="brand.secondary"
                                              _hover={{
                                                bg: 'brand.dark',
                                                cursor: 'pointer',
                                              }}
                                              w="50%"
                                              size="sm"
                                              onClick={(e) =>
                                                handleRightMove(
                                                  e,
                                                  itemIndex,
                                                  columns,
                                                  setColumns,
                                                  column,
                                                )
                                              }
                                            >
                                              <Stack direction="row">
                                                <Hide below="md">
                                                  <FiArrowRight />
                                                </Hide>
                                                <Hide above="md">
                                                  <FiArrowDown />
                                                </Hide>
                                              </Stack>
                                            </Button>
                                          ) : null}
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
              {/*<Button
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
              </Button>*/}
            </DragDropContext>
          </Stack>
        )}
      </Container>
      <Container mb={6} maxW="container.xl">
        <HStack align={'center'} justify={'space-between'} spacing={4}>
          <HStack align={'center'} gap={10}>
            <Select w={'52'} onChange={(e) => setSeasonId(e.target.value)}>
              {club.seasons.map((season) => {
                return <option value={season.id}>{season.name}</option>;
              })}
            </Select>
            <Stack direction="row" alignItems="center">
              <label className="label-nowrap" htmlFor="date-of-match">
                Past match:
              </label>
              <Switch
                py={['0', '0', '6px']}
                size="lg"
                onChange={() => {
                  setShowDate(!showDate);
                  if (showDate) {
                    setGameDate(new Date().toISOString().split('T')[0]);
                  }
                }}
              />
            </Stack>
            {showDate ? (
              <Stack direction="row" alignItems="center">
                <label className="label-nowrap" htmlFor="date-of-match">
                  Date of the match:
                </label>
                <Input
                  id="date-of-match"
                  color="black"
                  value={gameDate}
                  size="md"
                  type="date"
                  w={['259px', '259px', '100%']}
                  onChange={(event) => setGameDate(event.target.value)}
                />
              </Stack>
            ) : null}
          </HStack>
          <Button
            w="259px"
            variant="primary"
            onClick={async () => {
              const homeTeam = [];
              homeTeam.push(...Object.values(columns[0].items));
              const guestTeam = [];
              guestTeam.push(...Object.values(columns[2].items));
              if (homeTeam.length < 2 || guestTeam.length < 2) {
                setErrorPopup(true);
              } else {
                const teamPlayers1 = columns[0].items.map((item) => ({
                  user: {
                    id: item.id,
                    name: item.name,
                  },
                  role: item.role ?? 'attack',
                }));
                const teamPlayers2 = columns[2].items.map((item) => ({
                  user: {
                    id: item.id,
                    name: item.name,
                  },
                  role: item.role ?? 'attack',
                }));

                const matchInput = {
                  club: club.id,
                  date: gameDate,
                  seasonId: seasonId ?? club.seasons[0].id,
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

                startInteractiveMatch({ match: matchInput, isPast: showDate });
                navigate(route.matchInteractive());
              }
            }}
          >
            Start match
          </Button>
        </HStack>
      </Container>
    </Flex>
  );
}
