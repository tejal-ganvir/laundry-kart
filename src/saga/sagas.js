import { all, call } from "redux-saga/effects";
import { LoginSaga } from "./login.saga";
import { RegisterSaga } from "./register.saga";
//import productsSaga from './products/saga';

export default function* rootSaga(getState) {
  yield all([call(LoginSaga), call(RegisterSaga)]);
}
