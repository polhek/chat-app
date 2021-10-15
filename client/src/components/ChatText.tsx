import React, {
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { ArrowBack, Send } from '@material-ui/icons';
import { useSocket } from '../context/SocketProvider';
import { useUsers } from '../context/UsersProvider';
import { v4 as uuidv4 } from 'uuid';
import { useAuthDispatch, UserContext } from '../context/userContext';

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

interface MessageProps {
  fromSelf: boolean;
  ref?: React.Ref<HTMLDivElement | null>;
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
  width: 95%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 70%;
  overflow: scroll;
`;

const MessageBox = styled.div<MessageProps>`
  background-color: ${(props) => (props.fromSelf ? '#256bb3' : '#6B7280')};
  color: white;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  min-height: 55px;
  border-radius: 5px;
  width: 70%;
  gap: 5px;
  align-self: ${(props) => (props.fromSelf ? 'end' : 'start')};
`;

const MsgText = styled.div`
  flex: 1;
`;

const TextFrom = styled.p`
  font-size: 9px;
  align-self: start;
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
  const [messages, setMessages] = useState<any[]>([]);
  const [mess, setMess] = useState<string>('');
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const { value } = useContext(UserContext);
  const socket = useSocket();
  const { connectedUsers, setLoggedUsers } = useUsers();

  useEffect(() => {
    if (socket == null) return;

    socket.on('private message', listenerMessage);

    return () => {
      socket.off('private message', listenerMessage);
    };
  });

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const listenerMessage = async (msgInfo: any) => {
    const usersList = [...connectedUsers];
    console.log('listmsg:', usersList);
    for (let i = 0; i < usersList.length; i++) {
      let user = usersList[i];
      if (user.userID === msgInfo.from) {
        user.messages.push({
          message: msgInfo.message,
          fromSelf: false,
        });
        //check if selected user id is the same....
        if (user.userID !== value.selectedUserId) {
          user.hasNewMessages = true;
        }
        console.log(user);
        console.log(connectedUsers, 'onprivatemessage');

        setLoggedUsers(usersList);
        break;
      }
    }
  };

  const onMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.userName) {
      socket?.emit('private-message', {
        message: mess,
        to: state.userID,
      });
      const usersList = [...connectedUsers];
      for (let i = 0; i < usersList.length; i++) {
        let user = usersList[i];
        if (user.userID === state.userID) {
          user.messages.push({ message: mess, fromSelf: true });
          console.log(connectedUsers, 'onmessage');
        }
      }
      setLoggedUsers(usersList);
      console.log('onmessage', connectedUsers);
    }

    setMess('');
  };

  return (
    <Wrapper>
      <ChatHeader>
        <ArrowBack />
        {userName}
      </ChatHeader>
      <Container>
        {connectedUsers
          .filter((item) => item.userID === state.userID)
          .map((item) => {
            return item.messages.map((i: any, index: number) => {
              const lastMessage = item.messages.length - 1 === index;
              return (
                <MessageBox
                  key={uuidv4()}
                  ref={lastMessage ? lastMessageRef : null}
                  fromSelf={i.fromSelf}
                >
                  <TextFrom>{i.fromSelf ? 'me' : userName}</TextFrom>

                  <MsgText>{i.message}</MsgText>
                </MessageBox>
              );
            });
          })}
      </Container>
      <NewMessage>
        <NewMessageForm
          onSubmit={(e) => {
            onMessage(e);
          }}
        >
          <MessageInput
            value={mess}
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
