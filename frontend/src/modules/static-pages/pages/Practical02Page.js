import { useState } from 'react';
import { useTodoList } from 'src/modules/todo/hooks';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  DeleteIcon,
  Heading,
  Input,
  Spacer,
  Stack,
  Tab,
  TabList,
  Tabs,
} from 'src/shared/design-system';

function TodoListItem({ isCompleted, children, onChange }) {
  return (
    <Stack
      direction="row"
      role="group"
      p="2"
      spacing="1"
      textDecoration={isCompleted ? 'line-through' : 'none'}
      color={isCompleted ? 'gray.500' : 'black'}
      _hover={{ bg: 'gray.100' }}
    >
      <Checkbox
        isChecked={isCompleted}
        onChange={(event) => onChange(event.target.checked)}
      >
        {children}
      </Checkbox>
      <Spacer />
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        size="sm"
        visibility="hidden"
        _groupHover={{ visibility: 'visible' }}
      />
    </Stack>
  );
}

const STATES = ['all', 'completed', 'not-completed'];

export function Practical02Page() {
  const { items, addItem, setItemCompleted, filter, setFilter } = useTodoList();
  const [newItemName, setNewItemName] = useState('');

  return (
    <Box>
      <Heading>Practical 02</Heading>
      <form
        onSubmit={(event) => {
          // Prevent reloading the page on submit (default browser behaviour)
          event.preventDefault();

          // Add the item to the to-do list state
          addItem(newItemName);

          // Clear the input field
          setNewItemName('');
        }}
      >
        <Input
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          type="text"
          placeholder="What needs to be done?"
        />
        <Button type="submit">Add</Button>
      </form>

      <Tabs
        index={STATES.indexOf(filter)}
        onChange={(index) => setFilter(STATES[index])}
        variant="soft-rounded"
        colorScheme="blue"
        my="4"
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Completed</Tab>
          <Tab>Not completed</Tab>
        </TabList>
      </Tabs>

      <Stack
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        overflow="hidden"
        spacing="0"
      >
        {items.map((item) => (
          <TodoListItem
            key={item.id}
            onChange={(completed) => setItemCompleted(item.id, completed)}
            isCompleted={item.isCompleted}
          >
            {item.name}
          </TodoListItem>
        ))}
      </Stack>
    </Box>
  );
}
