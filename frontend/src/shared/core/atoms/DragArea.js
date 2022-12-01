import { useDrop } from 'react-dnd';
import { ItemTypes } from 'src/modules/matches/ItemTypes';
import { Box } from '@chakra-ui/react';
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};
export const DragArea = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'DragArea' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <Box ref={drop} sx={style} bg={backgroundColor} data-testid="DragArea">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </Box>
  );
};
