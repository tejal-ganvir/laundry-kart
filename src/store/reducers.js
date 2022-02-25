import { combineReducers } from "redux";
import Layout from "./reducers/layoutReducers";
import LocationReducer from "./reducers/locationReducers";
import LaundryReducers from "./reducers/laundryReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { LoginReducer } from "./reducers/loginReducers";
import { RegisterReducer } from "./reducers/registerReducers";
import { VendorProfileReducer } from "./reducers/vendorprofileReducers";
import { VendorHistoryReducer } from "./reducers/vendorHistoryReducer";
import { VendorRiderReducer } from "./reducers/vendorRiderReducers";
import { VendorServiceReducer } from "./reducers/vendorServiceReducers";

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
  profile: VendorProfileReducer,
  vendorHistory: VendorHistoryReducer,
  vendorRiders: VendorRiderReducer,
  vendorServices: VendorServiceReducer,
});
export default persistReducer(persistConfig, rootReducer);
