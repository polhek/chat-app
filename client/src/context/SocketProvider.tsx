import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useUsers } from './UsersProvider';

interface ISocket extends Socket {
  userID?: string;
}

const SocketContext = createContext<ISocket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface Props {
  children: ReactElement;
}

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const { connectedUsers } = useUsers();

  useEffect(() => {
    const newSocket: ISocket = io('http://localhost:4000', {
      autoConnect: false,
    });

    //for development only...
    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });

    newSocket.on('connect', () => {
      console.log('logged: ', connectedUsers);
    });

    newSocket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log('Neki ne štima');
      }
    });

    newSocket.on('session', ({ sessionID, userID, userName }) => {
      newSocket.auth = { sessionID };
      localStorage.setItem('sessionID', sessionID);
      newSocket.userID = userID;
    });

    setSocket(newSocket);

    return () => {
      newSocket.off('connect_error');
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
