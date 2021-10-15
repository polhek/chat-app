import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { useSocket } from './SocketProvider';

export const inState = {
  connectedUsers: [],
  addUser: (user: any) => {},
  sortUsers: (user: any, socketID: string) => {},
  setLoggedUsers: () => {},
};

export interface initState {
  connectedUsers: any[];
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

const initReactiveProperties = (user: any) => {
  user.messages = [];
  user.hasNewMessages = false;
};

export const UsersProvider = ({ children }: Props) => {
  const [connectedUsers, setLoggedUsers] = useState<any[]>([]);

  const addUser = (user: any) => {
    console.log('add', connectedUsers);

    // const copyLoggedUsers = [...loggedUsers];

    // console.log('copy of loggedUsers length', copyLoggedUsers.length);
    // console.log(user.userID, '"ADD USER: USER"');
    // if (copyLoggedUsers.length > 1) {
    //   for (let i = 0; i < copyLoggedUsers.length; i++) {
    //     let existingUser = copyLoggedUsers[i];
    //     if (existingUser.userID === user.userID) {
    //       console.log('existing user!!!!', existingUser);
    //       existingUser.connected = true;
    //       setLoggedUsers([...copyLoggedUsers]);
    //       return;
    //     }
    //   }
    // }

    // initReactiveProperties(user);
    // copyLoggedUsers.push({ ...user });
    // console.log('copyafter', copyLoggedUsers);
    // setLoggedUsers([...copyLoggedUsers]);
  };

  const sortUsers = (users: any, socketUserID: string) => {
    const usersCopy = users;

    usersCopy.forEach((u: any) => {
      for (let i = 0; i < usersCopy.length; i++) {
        const existingUser = usersCopy[i];
        if (existingUser.userID === u.userID) {
          existingUser.connected = u.connected;
          break;
        }
      }
      u.self = u.userID === socketUserID;
      initReactiveProperties(u);
    });
    // put the current user first, and sort by username
    let sorted = usersCopy.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });

    setLoggedUsers([...sorted]);
  };

  return (
    <UsersContext.Provider
      value={{ connectedUsers, setLoggedUsers, addUser, sortUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};
