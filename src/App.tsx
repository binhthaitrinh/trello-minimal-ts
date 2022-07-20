import React from 'react';
import { AddNewItem } from './AddNewItem';
import { Column } from './Column';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './style';

function App() {
  const { lists } = useAppState();

  return (
    <AppContainer>
      {/* We don't have to specify the type of `list` since TS derives it automatically */}
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem toggleButtonText='+ Add another list' onAdd={console.log} />
    </AppContainer>
  );
}

export { App };
