import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './style';

type ColumnProps = {
  text: string;
};

export const Column = ({ text }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      <Card text='Generate app scaffold' />
      <Card text='Learn TS' />
      <Card text='Begin to use static typing' />
      <AddNewItem
        toggleButtonText='+ Add another card'
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
