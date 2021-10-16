const ROOT_URL: String = 'http://localhost:4000/api';

export const userLogin = async (dispatch: any, loginPayload: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    await dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      await dispatch({ type: 'LOG_IN', user: data.user });
      // save user to localStorage.
      localStorage.setItem('loggedUser', JSON.stringify(data.user.userName));
      return data;
    }
  } catch (error) {
    await dispatch({ type: 'LOGIN_ERROR', error: error });
  }
};

export const logOut = async (dispatch: any) => {
  dispatch({ type: 'LOGOUT' });
};

export const selectUser = (dispatch: any, loginPayload: any) => {
  dispatch({
    type: 'SELECT_USER',
    selectedUserId: loginPayload.selectedUserId,
  });
};
