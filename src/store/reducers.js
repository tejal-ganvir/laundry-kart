import { combineReducers } from "redux";
import Layout from "./reducers/layoutReducers";
import LocationReducer from "./reducers/locationReducers";
import LaundryReducers from "./reducers/laundryReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { LoginReducer } from "./reducers/loginReducers";
import { RegisterReducer } from "./reducers/registerReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({
  Layout: Layout,
  Location: LocationReducer,
  Laundry: LaundryReducers,
  login: LoginReducer,
  register: RegisterReducer,
});
export default persistReducer(persistConfig, rootReducer);
