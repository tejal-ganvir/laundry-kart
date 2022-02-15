import RegisterActionTypes from "../actionTypes/registerTypes";

const intialState = {
  user: null,
  isLoading: false,
  isRegister: false,
  registerDetails: null,
  errorMessage: null,
};

export const RegisterReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case RegisterActionTypes.REGISTER_START:
      return { ...state, isLoading: true, registerDetails: payload };
    case RegisterActionTypes.REGISTER_SUCCESS:
      return { ...state, isLoading: false, isRegister: true };
    case RegisterActionTypes.REGISTER_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
