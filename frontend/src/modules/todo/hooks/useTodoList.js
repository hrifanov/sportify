import { useState } from 'react';

const initialItems = [
  {
    id: 1,
    name: 'go grocery shopping',
    isCompleted: false,
  },
  {
    id: 2,
    name: 'wash the dishes',
    isCompleted: false,
  },
  {
    id: 3,
    name: 'write some React code',
    isCompleted: true,
  },
];

export function useTodoList() {
  const [todoState, setTodoState] = useState({
    filter: 'all',
    items: initialItems,
    nextId: initialItems.length + 1,
  });

  const addItem = (name) => {
    setTodoState((prevState) => {
      const { nextId } = prevState;

      return {
        ...prevState, // Set all previous state
        items: [
          ...prevState.items, // Insert all existing items
          {
            id: nextId,
            name,
          },
        ],
        nextId: nextId + 1, // Increment ID for next time an item is added
      };
    });
  };

  const setItemCompleted = (id, isCompleted) => {
    setTodoState((prevState) => ({
      ...prevState, // Set all previous state (`nextId` will remain unchanged)
      items: prevState.items.map((item) => {
        // Change only the item that was clicked
        if (item.id === id) {
          return {
            ...item,
            isCompleted,
          };
        }

        // Do nothing with the rest of the items
        return item;
      }),
    }));
  };

  const setFilter = (filter) => {
    setTodoState((prevState) => ({
      ...prevState,
      filter,
    }));
  };

  return {
    filter: todoState.filter,
    items: todoState.items,
    addItem,
    setItemCompleted,
    setFilter,
  };
}
