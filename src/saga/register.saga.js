import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { setUserRegistration } from "../services/Register/registerservice";
import { userMeRequestAction } from "../store/actions/loginActions";
import {
  RegisterFailed,
  RegisterSuccess,
} from "../store/actions/registerActions";
import RegisterActionTypes from "../store/actionTypes/registerTypes";

export function* RegisterAsync(action) {
  try {
    const user = yield setUserRegistration(action.payload);
    yield put(userMeRequestAction(user.sessionToken));
    yield put(RegisterSuccess());
  } catch (error) {
    toast(error.data.error);
    yield put(RegisterFailed(error.data.error));
  }
}

export function* RegisterStart() {
  yield takeLatest(RegisterActionTypes.REGISTER_START, RegisterAsync);
}

export function* RegisterSaga() {
  yield all([call(RegisterStart)]);
}
