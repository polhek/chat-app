import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import { useSocket } from '../context/SocketProvider';

interface Props {}

const Login = (props: Props) => {
  const socket = useSocket();
  useEffect(() => {
    console.log(socket);
    const sessionID = localStorage.getItem('sessionID');
    console.log(sessionID);
    if (socket) {
      if (sessionID) {
        console.log(sessionID);
        socket.auth = { sessionID };
        socket?.connect();
        console.log('connection succeded');
      }
    }
  }, [socket]);

  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
