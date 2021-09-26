import React from 'react';
import styled from 'styled-components';
interface State {
  userID: string;
}

interface Props {
  userName: string;
  state: State | any;
}
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

const ChatText = ({ userName, state }: Props) => {
  return (
    <Wrapper>
      <Container>
        <p>{userName}</p>
        <p>{state.userID}</p>
      </Container>
    </Wrapper>
  );
};

export default ChatText;
