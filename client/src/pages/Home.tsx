import { useContext, useEffect, useState } from 'react';
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

  //TODO: isAuth ... shran userja v localstorage, de bo isAuth: true, pa user value inside!
  const { loading, isAuth } = value;
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    //todo: Nekak ne runi vsakič vsega tega kar je tuki nutr...
    console.log('Tukaj preveri, če obstaja session id');
    if (socket) {
      checkUserLogin();
      console.log(loading, 'loading');
    }
  }, [socket]);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  const checkUserLogin = async () => {
    if (socket) {
      console.log('tu nesmi runat');
      const sessionID = localStorage.getItem('sessionID');
      const userName = localStorage.getItem('loggedUser');
      if (sessionID && userName) {
        console.log(sessionID);
        console.log(userName);

        const payload = { userName: JSON.parse(userName) };
        let response = await userLogin(authDispatch, payload);
        console.log(response);
        socket.auth = { sessionID };
        socket?.connect();
        console.log('connection succeeded');
      } else {
        setRedirect(true);
      }
    }
  };

  //if authenticated, connect to socket server, and attach username...

  return (
    <>
      <Navbar />
      <ChatBoard />
    </>
  );
};

export default Home;
