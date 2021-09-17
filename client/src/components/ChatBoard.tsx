import React from 'react';
import styled from 'styled-components';

interface Props {}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
  background-color: red;
`;

const ChatBoard = (props: Props) => {
  return (
    <Wrapper>
      <Container>ss </Container>
    </Wrapper>
  );
};

export default ChatBoard;
