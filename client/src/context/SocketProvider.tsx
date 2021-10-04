import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface Props {
  //id: String;
  children: ReactElement;
}

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000', { autoConnect: false });

    //for development only...
    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });
    newSocket.on('connect', () => {
      console.log('Connected ');
    });

    newSocket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log('Neki ne štima');
      }
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
