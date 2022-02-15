import RegisterActionTypes from "../actionTypes/registerTypes";

export const RegisterStart = (data) => ({
  type: RegisterActionTypes.REGISTER_START,
  payload: data,
});

export const RegisterSuccess = () => ({
  type: RegisterActionTypes.REGISTER_SUCCESS,
});

export const RegisterFailed = (errorMessage) => ({
  type: RegisterActionTypes.REGISTER_FAILED,
  payload: errorMessage,
});
