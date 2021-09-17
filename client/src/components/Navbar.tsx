import React from 'react';
import styled from 'styled-components';
import SearchComponent from './SearchComponent';

// styled components
const Container = styled.div`
  height: 60px;
  background-color: #256bb3;
  color: #ffffff;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.h1`
  font-weight: 500;
`;

interface Props {}

const Navbar = (props: Props) => {
  return (
    <Container>
      <Wrapper>
        <Header>.Chat app</Header>
        <SearchComponent />
      </Wrapper>
    </Container>
  );
};

export default Navbar;
