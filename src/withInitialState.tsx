import React, { useEffect, useState } from 'react';
import { load } from './api';
import { AppState } from './state/appStateReducer';

type InjectedProps = {
  initialState: AppState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  // We need to define like this so TS allows us to pass the fields defined in InjectedProps type to our component
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
          }
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);

    if (isLoading) return <div>Loading</div>;

    if (error) {
      return <div>{error.message}</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
