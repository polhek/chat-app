import { createContext, ReactElement, useReducer, useContext } from 'react';

import { initialState, IState, userReducer } from './reducers';

export const UserContext = createContext<IState | any>(initialState);

export const useAuthDispatch = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch .... ');
  }
  return context.dispatch;
};

interface Props {
  children: ReactElement;
  initialState: IState | any;
}

export const UserProvider = ({ children, initialState }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  console.log(state, 'state:');
  return (
    <UserContext.Provider value={{ value: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
