import { useContext } from 'react';
import { Redirect } from 'react-router';
import ChatBoard from '../components/ChatBoard';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/userContext';

interface Props {}

const Home = (props: Props) => {
  const { value } = useContext(UserContext);

  const { isAuth, user } = value;

  console.log(isAuth, user);

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
