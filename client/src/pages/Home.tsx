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
