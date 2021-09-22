const ROOT_URL: String = 'http://localhost:5000/api';

export const userLogin = async (dispatch: any, loginPayload: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
  console.log(requestOptions.body);
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      dispatch({ type: 'LOG_IN', user: data.user });
      return data;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
};

export const logOut = async (dispatch: any) => {
  dispatch({ type: 'LOGOUT' });
};
