import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { useSocket } from './SocketProvider';

export const inState = {
  loggedUsers: [],
  addUser: (user: any) => {},
  sortUsers: (user: any, socketID: string) => {},
  setLoggedUsers: () => {},
};

export interface initState {
  loggedUsers: any[];
  addUser(user: any): void;
  sortUsers(users: any, socketID: string): void;
  setLoggedUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const UsersContext = createContext<initState>(inState);

export const useUsers = () => {
  return useContext(UsersContext);
};

interface Props {
  children: ReactElement;
}

export const UsersProvider = ({ children }: Props) => {
  const [loggedUsers, setLoggedUsers] = useState<any[]>([]);
  const socket = useSocket();

  const addUser = (user: any) => {
    console.log(typeof loggedUsers);
    const users: any[] = [...loggedUsers];
    users.push(user);
    setLoggedUsers(users);
  };

  const sortUsers = (users: any, socketID: string) => {
    const usersCopy = [...users];
    console.log('users copy: ', usersCopy);
    console.log('socketid', socketID);
    usersCopy.forEach((user: any) => {
      user.self = user.userID === socketID;
    });

    let sorted = users.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    console.log('sorted', sorted);
    setLoggedUsers([...sorted]);
  };

  return (
    <UsersContext.Provider
      value={{ loggedUsers, setLoggedUsers, addUser, sortUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};
