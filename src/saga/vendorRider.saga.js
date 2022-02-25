import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getVendorRiderCreatedetails,
  getVendorRideretails,
} from "../services/VendorRider/vendorRiderService";
import {
  RiderCreateFailed,
  RiderCreateSuccess,
  RiderFailed,
  RiderSuccess,
} from "../store/actions/vendorRidersActions";
import VendorRiderActionTypes from "../store/actionTypes/vendorRiderActionsTypes";

export function* VendorRiderCreateAsync(action) {
  try {
    const rider = yield getVendorRiderCreatedetails(action.payload);
    yield put(RiderCreateSuccess(rider));
  } catch (error) {
    yield put(RiderCreateFailed(error.message));
  }
}

export function* VendorRiderCreateStart() {
  yield takeLatest(
    VendorRiderActionTypes.RIDER_CREATE_START,
    VendorRiderCreateAsync,
  );
}

export function* VendorRiderAsync() {
  try {
    // const riders = yield getVendorRideretails();
    // console.log(riders);
    // yield put(RiderSuccess(riders.result));
  } catch (error) {
    // yield put(RiderFailed(error.message));
  }
}

export function* VendorRiderStart() {
  yield takeLatest(
    VendorRiderActionTypes.VENDOR_RAIDER_START,
    VendorRiderAsync,
  );
}
export function* VendorRiderSaga() {
  yield all([call(VendorRiderCreateStart), call(VendorRiderAsync)]);
}
