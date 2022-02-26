import { all, call } from "redux-saga/effects";
import laundrySaga from "./laundrySaga";
import { LoginSaga } from "./login.saga";
import { RegisterSaga } from "./register.saga";
import { VendorOrderSaga } from "./vendorOrder.saga";
import { VendorProfileSaga } from "./vendorProfileSaga";
import { VendorRiderSaga } from "./vendorRider.saga";
import { VendorServiceSaga } from "./vendorService.saga";
//import productsSaga from './products/saga';

export default function* rootSaga(getState) {
  yield all([
    call(LoginSaga),
    call(RegisterSaga),
    call(laundrySaga),
    call(VendorProfileSaga),
    call(VendorRiderSaga),
    call(VendorServiceSaga),
    call(VendorOrderSaga),
  ]);
}
