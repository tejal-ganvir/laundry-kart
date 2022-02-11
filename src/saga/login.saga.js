import { LoginSuccess, LoginFailed } from "../store/actions/loginActions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import LoginActionTypes from "../store/actionTypes/loginTypes";
import { getLoginUser } from "../services/Login/loginservice";

export function* LoginAsync(action) {
  try {
    const user = yield getLoginUser(action.payload);
    yield put(LoginSuccess(user));
  } catch (error) {
    yield put(LoginFailed(error.message));
  }
}

export function* LoginStart() {
  yield takeLatest(LoginActionTypes.LOGIN_START, LoginAsync);
}

export function* LoginSaga() {
  yield all([call(LoginStart)]);
}
