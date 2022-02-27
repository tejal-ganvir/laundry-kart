import LoginActionTypes from "../actionTypes/loginTypes";

export const LoginStart = (data) => ({
  type: LoginActionTypes.LOGIN_START,
  payload: data,
});

export const LoginSuccess = (user) => ({
  type: LoginActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailed = (errorMessage) => ({
  type: LoginActionTypes.LOGIN_FAILED,
  payload: errorMessage,
});

export const LogoutStart = () => ({
  type: LoginActionTypes.LOGOUT_START,
});

export const userMeRequestAction = (token) => ({
  type: LoginActionTypes.USER_ME_REQUEST,
  payload: token,
});

