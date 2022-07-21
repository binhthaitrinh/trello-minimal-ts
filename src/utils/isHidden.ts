import { DragItem } from '../DragItem';

export const isHidden = (
  draggedItem: DragItem | null,
  itemType: string,
  id: string,
  isPreview?: boolean
) => {
  return (
    !isPreview &&
    Boolean(
      draggedItem && draggedItem.type === itemType && draggedItem.id === id
    )
  );
};
