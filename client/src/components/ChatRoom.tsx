import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiberManualRecord } from '@material-ui/icons';
import { useAuthDispatch } from '../context/userContext';
import { selectUser } from '../context/actions';

interface Props {}

const Contact = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 70px;
  padding: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const Left = styled.div`
  display: flex;
  gap: 0.55rem;
  align-items: center;
  max-width: 80%;
`;

const Avatar = styled.img`
  vertical-align: middle;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const LastMessage = styled.div`
  font-size: 0.875rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 4px 2px;
`;

const Timestamp = styled.span`
  font-size: 0.875rem;
`;

const JoinChat = styled.button`
  background-color: #256bb3;
  color: white;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0a59a8;
  }
`;

interface Props {
  key: String;
  userName: String;
  userID: string;
  status: boolean;
  messages: any[];
}

const ChatRoom = ({ userName, userID, status, messages }: Props) => {
  const authDispatch = useAuthDispatch();

  const chooseUser = () => {
    let payload = { selectedUserId: userID };
    selectUser(authDispatch, payload);
  };

  return (
    <Contact>
      <Left>
        <Avatar
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          className="avatar"
        />
        <Info>
          <Username>{userName}</Username>
          <LastMessage>
            {status ? (
              <Status>
                <FiberManualRecord style={{ color: 'Green' }} /> Online
              </Status>
            ) : (
              <Status>
                <FiberManualRecord style={{ color: 'Red' }} /> Offline
              </Status>
            )}
          </LastMessage>
        </Info>
      </Left>
      <Right>
        <Timestamp>12:34</Timestamp>
        <Link
          to={{
            pathname: `/chat/${userName}`,
            state: { userID, userName, messages },
          }}
        >
          <JoinChat onClick={() => chooseUser()}>Join</JoinChat>
        </Link>
      </Right>
    </Contact>
  );
};

export default ChatRoom;
