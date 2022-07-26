import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { addTask, moveList, moveTask, setDraggedItem } from './state/action';
import { useAppState } from './state/AppStateContext';
import { ColumnContainer, ColumnTitle } from './style';
import { isHidden } from './utils/isHidden';
import { useItemDrag } from './utils/useItemDrag';

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      } else {
        // When dropping to the same column, let the logic in Card handle the drop
        if (draggedItem.columnId === id) {
          return;
        }

        // When dropping to a column with other tasks, let the logic in Card handle the drop
        if (tasks.length) {
          return;
        }

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });
  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  const tasks = getTasksByListId(id);

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another card'
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
