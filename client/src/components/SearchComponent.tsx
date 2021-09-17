import React from 'react';
import { Search } from '@material-ui/icons';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border: 0.5px solid lightblue;
  display: flex;
  align-items: center;
  height: 35px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  height: 100%;
  color: white;
  margin: 0;
  font-size: 16px;
  padding: 5px;
  outline: none;
`;

interface Props {}

const SearchComponent = (props: Props) => {
  return (
    <SearchContainer>
      <Input />
      <Search />
    </SearchContainer>
  );
};

export default SearchComponent;
