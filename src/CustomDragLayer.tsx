import { useDragLayer } from 'react-dnd';
import { Card } from './Card';
import { Column } from './Column';
import { useAppState } from './state/AppStateContext';
import { CustomDragLayerContainer, DragPreviewWrapper } from './style';

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  // type of `useDragLayer` is a generic that the value
  // depends on the return of the collector function
  // in this case: XYCoord
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === 'COLUMN' ? (
          <Column isPreview id={draggedItem.id} text={draggedItem.text} />
        ) : (
          <Card
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
            columnId={draggedItem.columnId}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
