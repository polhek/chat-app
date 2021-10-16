import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';

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
    setLoggedUsers((oldUsers) => {
      const newUsers: any[] = [...oldUsers];
      console.log(newUsers);
      for (let i = 0; i < newUsers.length; i++) {
        const existingUser = newUsers[i];
        if (existingUser.userID === user.userID) {
          existingUser.connected = true;

          return newUsers;
        }
      }
      initReactiveProperties(user);
      newUsers.push(user);
      return newUsers;
    });
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
    // sort users, put yourself on first place.
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
