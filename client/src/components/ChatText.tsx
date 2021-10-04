import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowBack, Send } from '@material-ui/icons';
import { useSocket } from '../context/SocketProvider';
import { useUsers } from '../context/UsersProvider';

interface State {
  userID: string;
  userName: string;
}

interface Props {
  userName: string;
  state: State | any;
}

interface Message {
  userName: string;
  message: string;
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(243, 244, 246);
`;

const ChatHeader = styled.div`
  background-color: #256bb3;
  padding: 1.2rem;
  color: #ffffff;
  height: 55px;
  display: flex;
  align-items: center;
  width: 100vw;
  opacity: 0.8;
  gap: 0.3rem;
`;

const Container = styled.div`
  background-color: red;
  width: 95%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 70%;
`;

const NewMessage = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 1.2rem;
  width: 100%;
`;

const NewMessageForm = styled.form`
  flex: 1;
  display: flex;
`;

const MessageInput = styled.input`
  height: 50px;
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const SendButton = styled.button``;
const ChatText = ({ userName, state }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mess, setMess] = useState<string>('');
  const socket = useSocket();
  const { loggedUsers } = useUsers();

  useEffect(() => {
    if (socket == null) return;

    listenerMessage();

    return () => {
      listenerMessage();
    };
  }, []);

  const listenerMessage = () => {
    socket?.on('private message', ({ message, from }) => {
      //console.log('new', message, 'fr', from);

      //TODO:
      for (let i = 0; i < loggedUsers.length; i++) {
        const user = loggedUsers[i];
        if (user.userID === from) {
          console.log(user);
          user.messages = [];
          user.messages.push({ message: message, fromSelf: false });
          if (user !== state.userID) {
            user.hasNewMessages = true;
          }
          console.log(loggedUsers);
          break;
        }
      }
    });
  };

  const onMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.userName) {
      console.log(mess);
      socket?.emit('private-message', {
        message: mess,
        to: state.userID,
      });
    }
    console.log(loggedUsers);
    setMess('');
  };

  console.log(mess);

  return (
    <Wrapper>
      <ChatHeader>
        <ArrowBack />
        {userName}
      </ChatHeader>
      <Container>
        {messages.map((m) => {
          return <p>{m.message}</p>;
        })}
      </Container>
      <NewMessage>
        <NewMessageForm
          onSubmit={(e) => {
            onMessage(e);
          }}
        >
          <MessageInput
            onChange={(e) => {
              setMess(e.target.value);
            }}
          ></MessageInput>
          <SendButton type="submit">
            <Send />
          </SendButton>
        </NewMessageForm>
      </NewMessage>
    </Wrapper>
  );
};

export default ChatText;
