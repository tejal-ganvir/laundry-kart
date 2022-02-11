import LoginActionTypes from "../actionTypes/loginTypes";

const intialState = {
  user: null,
  isLoading: false,
  isLogin: false,
  loginDetails: null,
  errorMessage: null,
};

export const LoginReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case LoginActionTypes.LOGIN_START:
      return { ...state, isLoading: true, loginDetails: payload };
    case LoginActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoading: false, isLogin: true, user: payload };
    case LoginActionTypes.LOGIN_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
