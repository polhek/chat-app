import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

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
