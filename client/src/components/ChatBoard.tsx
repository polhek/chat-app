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
  const { connectedUsers, setLoggedUsers, addUser, sortUsers } = useUsers();
  console.log(connectedUsers);
  console.log(useUsers());

  useEffect(() => {
    if (socket == null) return;

    socket.on('users', (users) => {
      console.log(users);
      if (socket.userID) {
        const socketID: string = socket?.userID;
        sortUsers(users, socketID);
      }
    });

    socket.on('user-connected', (user: any) => {
      console.log(user, 'this user connected!');
      const connectingUser = user;
      addUser(connectingUser);
    });

    // socket.on('disconnect', () => {
    //   console.log('disconnect');
    //   const users = [...loggedUsers];
    //   users.forEach((user) => {
    //     if (user.self === true) {
    //       user.connected = false;
    //     }
    //   });
    //   setLoggedUsers(users);
    // });

    // socket.on('connect', () => {
    //   const users = [...loggedUsers];
    //   users.forEach((u) => {
    //     if (u.self) {
    //       u.connected = true;
    //     }
    //   });
    //   setLoggedUsers(users);
    // });

    socket.on('user-disconnected', (userID) => {
      console.log('disconnected user');
      const users = [...connectedUsers];
      users.forEach((u) => {
        if (u.userID === userID) {
          u.connected = false;
          setLoggedUsers([...users]);
        }
      });
    });
    return () => {
      socket.off('users');
      socket.off('user-connected');
    };
  }, [socket]);

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
