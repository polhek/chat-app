import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import ChatBoard from '../components/ChatBoard';
import Navbar from '../components/Navbar';
import { useSocket } from '../context/SocketProvider';
import { UserContext } from '../context/userContext';

interface Props {}

const Home = (props: Props) => {
  const { value } = useContext(UserContext);
  const socket = useSocket();
  const { isAuth, user } = value;

  //if authenticated, connect to socket server, and attach username...
  if (isAuth) {
    if (socket) {
      socket.auth = { userName: user.userName };
      socket.connect();
    }
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar />
      <ChatBoard />
    </>
  );
};

export default Home;
