import React from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import ChatText from '../components/ChatText';
import Navbar from '../components/Navbar';

interface Props {}

const Chat = (props: Props) => {
  const { userName } = useParams<{ userName: string }>();
  const { state } = useLocation();
  // state je user id // username je iz params
  //TODO: izgled za chat z userjem...

  return (
    <>
      <Navbar />
      <ChatText state={state} userName={userName} />
    </>
  );
};

export default Chat;
