export type User = { id: string; name: string; chats: string[] };

export interface IState {
  isAuth: boolean;
  loading: boolean;
  user: User | null;
  error: Error | null;
  selectedUserId: String | null;
}

export const initialState = {
  isAuth: false,
  loading: false,
  user: null,
  error: null,
  selectedUserId: null,
};

export enum actionTypes {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  LOGIN_ERROR = 'LOGIN_ERROR',
  SELECT_USER = 'SELECT_USER',
}

export type IAction =
  | {
      type: actionTypes.LOG_IN;
      user: User;
    }
  | {
      type: actionTypes.LOG_OUT;
    }
  | {
      type: actionTypes.REQUEST_LOGIN;
    }
  | {
      type: actionTypes.LOGIN_ERROR;
      error: Error | null;
    }
  | {
      type: actionTypes.SELECT_USER;
      selectedUserId: string;
    };

export const userReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case actionTypes.REQUEST_LOGIN:
      return { ...state, loading: true };
    case actionTypes.LOG_IN:
      return { ...state, isAuth: true, user: action.user, loading: false };
    case actionTypes.LOG_OUT:
      return { ...state, isAuth: false, user: null };
    case actionTypes.LOGIN_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case actionTypes.SELECT_USER: {
      return { ...state, selectedUserId: action.selectedUserId };
    }
    default:
      return state;
  }
};
