import { LoginSuccess, LoginFailed } from "../store/actions/loginActions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import LoginActionTypes from "../store/actionTypes/loginTypes";
import { getLoginUser, getUserByToken } from "../services/Login/loginservice";
import { toast } from "react-toastify";

export function* LoginAsync(action) {
  try {
    const user = yield getLoginUser(action.payload);
    yield put(LoginSuccess(user));
  } catch (error) {
    toast(error.data.error);
    yield put(LoginFailed(error.data.error));
  }
}

export function* UserAsyncWithToken({payload}) {
  try {
    const res = yield getUserByToken(payload);
    yield put(LoginSuccess(res.data));
  } catch (error) {
    toast(error.data.error);
    yield put(LoginFailed(error.data.error));
  }
}

export function* LoginStart() {
  yield takeLatest(LoginActionTypes.LOGIN_START, LoginAsync);
}

export function* setUserDataWithToken() {
  yield takeLatest(LoginActionTypes.USER_ME_REQUEST, UserAsyncWithToken);
}

export function* LoginSaga() {
  yield all([call(LoginStart), call(setUserDataWithToken)]);
}
