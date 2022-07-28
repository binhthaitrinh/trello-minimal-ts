import { createContext, Dispatch, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { save } from '../api';
import { DragItem } from '../DragItem';
import { withInitialState } from '../withInitialState';
import { Action } from './action';
import { AppState, appStateReducer, List, Task } from './appStateReducer';

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
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }: AppStateProviderProps) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
    const { lists, draggedItem } = state;

    // Save every time the state changes
    useEffect(() => {
      save(state);
    }, [state]);

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
  }
);

// We don't need to specify the return type
// Because TS can derive them automatically based on `AppStateContext` type
export const useAppState = () => {
  return useContext(AppStateContext);
};
