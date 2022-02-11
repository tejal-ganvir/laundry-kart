import { combineReducers } from "redux";
import Layout from "./reducers/layoutReducers";
import { LoginReducer } from "./reducers/loginReducers";
import { RegisterReducer } from "./reducers/registerReducers";

export default combineReducers({
  Layout: Layout,
  Login: LoginReducer,
  Register: RegisterReducer,
});
