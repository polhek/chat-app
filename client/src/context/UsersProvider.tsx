import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';

export const inState = {
  loggedUsers: [],
  addUser: (user: any) => {},
  sortUsers: (user: any) => {},
};

export interface initState {
  loggedUsers: any[];
  addUser(user: any): void;
  sortUsers(users: any): void;
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

  const addUser = (user: any) => {
    console.log(typeof loggedUsers);
    const users: any[] = loggedUsers;
    users.push(user);
    setLoggedUsers(users);
  };

  const sortUsers = (users: any) => {
    let sorted = users.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    setLoggedUsers(sorted);
  };

  return (
    <UsersContext.Provider value={{ loggedUsers, addUser, sortUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
