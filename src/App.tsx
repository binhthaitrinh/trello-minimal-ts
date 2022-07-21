import React from 'react';
import { AddNewItem } from './AddNewItem';
import { Column } from './Column';
import { CustomDragLayer } from './CustomDragLayer';
import { addList } from './state/action';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './style';

function App() {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {/* We don't have to specify the type of `list` since TS derives it automatically */}
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
}

export { App };
