export type ColumnDragItem = {
  id: string;
  text: string;
  type: 'COLUMN';
};

export type CardDragItem = {
  id: string;
  text: string;
  columnId: string;
  type: 'CARD';
};

export type DragItem = ColumnDragItem | CardDragItem;
