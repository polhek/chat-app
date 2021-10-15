import { useCallback, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import ChatBoard from '../components/ChatBoard';
import Navbar from '../components/Navbar';
import { userLogin } from '../context/actions';
import { useSocket } from '../context/SocketProvider';
import { useAuthDispatch, UserContext } from '../context/userContext';

interface Props {}

const Home = (props: Props) => {
  const socket = useSocket();
  const authDispatch = useAuthDispatch();
  const { value } = useContext(UserContext);
  const { loading, isAuth } = value;
  const [redirect, setRedirect] = useState<boolean>(false);

  const checkUserLogin = useCallback(async () => {
    if (socket) {
      console.log('tu nesmi runat');
      const sessionID = localStorage.getItem('sessionID');
      const userName = localStorage.getItem('loggedUser');
      if (sessionID && userName) {
        const payload = { userName: JSON.parse(userName) };
        await userLogin(authDispatch, payload);

        socket.auth = { sessionID };
        socket?.connect();
        console.log('User exists, and connection succeeded');
      } else {
        setRedirect(true);
      }
    }
  }, [socket]);

  useEffect(() => {
    if (socket && !isAuth) {
      checkUserLogin();
    }
  }, [socket, isAuth, checkUserLogin]);

  if (redirect) {
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
