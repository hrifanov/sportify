import { useDrag } from 'react-dnd';
import { ItemTypes } from 'src/modules/matches/ItemTypes';
import { Box } from '@chakra-ui/react';

export const DragBox = function DragBox({ name, isDropped }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <Box
      textAlign="left"
      textColor="white"
      role="group"
      position="relative"
      borderRadius="base"
      w={300}
      cursor="grab"
      py={2}
      px={5}
      bg="brand.secondary"
      my={1}
      ref={drag}
      style={{ opacity }}
      data-testid={'box'}
    >
      {isDropped ? <s>{name}</s> : name}
    </Box>
  );
};
