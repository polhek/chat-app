import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSocket } from '../context/SocketProvider';
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
  const [loggedUsers, setLoggedUsers] = useState<any[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on('users', (users) => {
      sortUsers(users);
    });

    socket.on('user-connected', (user: any) => {
      const users: any[] = loggedUsers;
      users.push(user);
      setLoggedUsers(users);
    });

    return () => {
      socket.off('users');
      socket.off('user-connected');
    };
  });

  const sortUsers = (users: any) => {
    let sorted = users.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    setLoggedUsers(sorted);
  };

  return (
    <Wrapper>
      <Container>
        {loggedUsers.map((user: any) => {
          return <ChatRoom key={user?.userID} userName={user.userName} />;
        })}
      </Container>
    </Wrapper>
  );
};

export default ChatBoard;
