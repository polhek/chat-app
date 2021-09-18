import ChatBoard from '../components/ChatBoard';
import Navbar from '../components/Navbar';

interface Props {}

const Home = (props: Props) => {
  return (
    <>
      <Navbar />
      <ChatBoard />
    </>
  );
};

export default Home;
