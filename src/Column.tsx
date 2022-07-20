import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { addTask, moveList } from './state/action';
import { useAppState } from './state/AppStateContext';
import { ColumnContainer, ColumnTitle } from './style';
import { useItemDrag } from './utils/useItemDrag';

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });
  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  const tasks = getTasksByListId(id);

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another card'
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
