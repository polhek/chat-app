import React from 'react';
import styled from 'styled-components';
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
  return (
    <Wrapper>
      <Container>
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </Container>
    </Wrapper>
  );
};

export default ChatBoard;
