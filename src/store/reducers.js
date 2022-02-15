import { combineReducers } from "redux";
import Layout from "./reducers/layoutReducers";
import LocationReducer from "./reducers/locationReducers";
import { LoginReducer } from "./reducers/loginReducers";
import { RegisterReducer } from "./reducers/registerReducers";
import LaundryReducers from "./reducers/laundryReducers";

export default combineReducers({
  Layout: Layout,
  Login: LoginReducer,
  Register: RegisterReducer,
  Location: LocationReducer,
  Laundry: LaundryReducers,
});
