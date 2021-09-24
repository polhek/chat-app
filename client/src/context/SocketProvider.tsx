import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import io from 'socket.io-client';

interface IState {
  socket: any;
}
const iState = {
  socket: '',
};

const SocketContext = createContext<IState | undefined>(iState);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface Props {
  //id: String;
  children: ReactElement;
}

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<any>();
  console.log(socket);
  useEffect(() => {
    const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('connected');
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
