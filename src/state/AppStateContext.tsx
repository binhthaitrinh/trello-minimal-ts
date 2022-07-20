import { createContext, Dispatch, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { DragItem } from '../DragItem';
import { Action } from './action';
import { AppState, appStateReducer, List, Task } from './appStateReducer';

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: null,
};

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  // as to make TS think thast our empty object has AppStateContextProps type
  {} as AppStateContextProps
);

type AppStateProviderProps = {
  children?: React.ReactNode;
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

// We don't need to specify the return type
// Because TS can derive them automatically based on `AppStateContext` type
export const useAppState = () => {
  return useContext(AppStateContext);
};
