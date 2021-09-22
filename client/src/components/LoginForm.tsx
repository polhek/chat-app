import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { userLogin } from '../context/actions';
import { useAuthDispatch } from '../context/userContext';

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
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormContainer = styled.div`
  width: 700px;
  background-color: #256bb3;
  height: 300px;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
`;

const Label = styled.label`
  color: white;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.45rem;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  border: none;
  color: #256bb3;
  border-radius: 5px;
  background-color: white;
  padding: 0.75rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(229, 231, 235);
  }
`;

interface Props {}

const LoginForm = (props: Props) => {
  let history = useHistory();
  const [user, setUsername] = useState<String>('');

  const authDispatch = useAuthDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload = { userName: user };
    try {
      let response = await userLogin(authDispatch, payload);
      if (!response.user) return;
      history.push('/');
    } catch (error) {}
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Wrapper>
      <Container>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label>Enter your username:</Label>
              <Input
                onChange={(e) => {
                  onChange(e);
                }}
                type="text"
              ></Input>
            </FormGroup>
            <SubmitButton type="submit">Enter Chat</SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default LoginForm;
