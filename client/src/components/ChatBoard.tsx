import React, { useEffect, useState } from 'react';
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
  const { loggedUsers, addUser, sortUsers } = useUsers();

  console.log(loggedUsers);

  useEffect(() => {
    if (socket == null) return;

    socket.on('users', (users) => {
      sortUsers(users);
    });

    socket.on('user-connected', (user: any) => {
      addUser(user);
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
            <ChatRoom key={u.userID} userName={u.userName} userID={u.userID} />
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default ChatBoard;
