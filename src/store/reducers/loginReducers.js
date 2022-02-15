import LoginActionTypes from "../actionTypes/loginTypes";

const intialState = {
  currentUser: null,
  isLoading: false,
  isLogin: false,
  role: null,
  sessionToken: null,
  loginDetails: null,
  errorMessage: null,
};

export const LoginReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case LoginActionTypes.LOGIN_START:
      return { ...state, isLoading: true, loginDetails: payload };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        currentUser: payload,
        role: payload.role,
        sessionToken: payload.sessionToken,
      };
    case LoginActionTypes.LOGIN_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    case LoginActionTypes.LOGOUT_START:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        currentUser: null,
        role: null,
        sessionToken: null,
        loginDetails: null,
      };
    default:
      return state;
  }
};
