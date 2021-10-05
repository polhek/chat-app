import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSocket } from '../context/SocketProvider';
import { useUsers } from '../context/UsersProvider';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgba(243, 244, 246);
`;

const Container = styled.div`
  width: 95%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface Props {}

const ChatBoard = (props: Props) => {
  //const [loggedUsers, setLoggedUsers] = useState<any[]>([]);
  const socket = useSocket();
  const { loggedUsers, setLoggedUsers, addUser, sortUsers } = useUsers();

  useEffect(() => {
    if (socket == null) return;

    socket.on('users', (users) => {
      sortUsers(users);
    });

    socket.on('user-connected', (user: any) => {
      console.log(user, 'user ta je');
      addUser(user);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      const users = loggedUsers;
      users.forEach((user) => {
        if (user.self === true) {
          user.connected = false;
        }
      });
      setLoggedUsers(users);
    });

    socket.on('connect', () => {
      const users = loggedUsers;
      users.forEach((u) => {
        if (u.self) {
          u.connected = true;
        }
      });
      setLoggedUsers(users);
    });

    socket.on('disconnect', () => {
      const users = loggedUsers;
      users.forEach((u) => {
        if (u.self) {
          u.connected = false;
        }
      });
      setLoggedUsers(users);
    });

    socket.on('user-disconnected', (userID) => {
      const users = loggedUsers;
      users.forEach((u) => {
        if (u.userID === userID) {
          u.connected = false;
        }
      });
      setLoggedUsers(users);
    });
    return () => {
      socket.off('users');
    };
  });

  return (
    <Wrapper>
      <Container>
        {loggedUsers.map((u) => {
          return (
            <ChatRoom
              key={u.userID}
              userName={u.userName}
              userID={u.userID}
              messages={u.messages}
              status={u.connected}
            />
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default ChatBoard;
