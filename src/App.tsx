import React from 'react';
import { AddNewItem } from './AddNewItem';
import { Column } from './Column';
import { AppContainer } from './style';

function App() {
  return (
    <AppContainer>
      <Column text='Todo:' />
      <AddNewItem toggleButtonText='+ Add another list' onAdd={console.log} />
    </AppContainer>
  );
}

export { App };
