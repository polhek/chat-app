import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import { useSocket } from '../context/SocketProvider';

interface Props {}

const Login = (props: Props) => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
