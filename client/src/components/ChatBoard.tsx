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
  const socket = useSocket();
  const { connectedUsers, setLoggedUsers, addUser, sortUsers } = useUsers();

  useEffect(() => {
    if (socket == null) return;
    console.log(typeof connectedUsers);
    socket.on('users', (users) => {
      console.log(users);
      if (socket.userID) {
        const socketID: string = socket?.userID;
        sortUsers(users, socketID);
      }
    });

    socket.on('user-connected', (user: any) => {
      addUser(user);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      const users = [...connectedUsers];
      users.forEach((user) => {
        if (user.self === true) {
          user.connected = false;
        }
      });
      setLoggedUsers(users);
    });

    socket.on('connect', () => {
      const users = [...connectedUsers];
      users.forEach((u) => {
        if (u.self) {
          u.connected = true;
        }
      });
      setLoggedUsers(users);
    });

    socket.on('user-disconnected', (userID) => {
      setLoggedUsers((oldUsers) => {
        const newUsers = [...oldUsers];
        newUsers.forEach((u) => {
          if (u.userID === userID) {
            u.connected = false;
          }
        });
        return newUsers;
      });
    });
    return () => {
      socket.off('users');
      socket.off('user-connected');
      socket.off('connect');
      socket.off('user-disconnected');
    };
  }, [socket, addUser, connectedUsers, setLoggedUsers, sortUsers]);

  return (
    <Wrapper>
      <Container>
        {connectedUsers.map((u) => {
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
