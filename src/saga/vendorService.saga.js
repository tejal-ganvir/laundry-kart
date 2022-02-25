import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getVendorServiceCreatedetails,
  getVendorServiceDetails,
} from "../services/VendorService/vendorServiceService";
import {
  ServiceCreateFailed,
  ServiceCreateSuccess,
  ServiceFailed,
  ServiceStart,
} from "../store/actions/vendorServiceActions";
import VendorServiceActionTypes from "../store/actionTypes/vendorServiceActionTypes";

export function* VendorServiceCreateAsync(action) {
  try {
    const service = yield getVendorServiceCreatedetails(action.payload);
    yield put(ServiceCreateSuccess(service));
  } catch (error) {
    yield put(ServiceCreateFailed(error.message));
  }
}

export function* VendorServiceCreateStart() {
  yield takeLatest(
    VendorServiceActionTypes.SERVICE_CREATE_START,
    VendorServiceCreateAsync,
  );
}

export function* VendorServiceAsync(action) {
  try {
    const services = yield getVendorServiceDetails(action.payload);
    console.log(services);
    // yield put(ServiceStart(services.result));
  } catch (error) {
    yield put(ServiceFailed(error.message));
  }
}

export function* VendorServiceStart() {
  yield takeLatest(VendorServiceActionTypes.SERVICE_START, VendorServiceAsync);
}

export function* VendorServiceSaga() {
  yield all([call(VendorServiceCreateStart), call(VendorServiceStart)]);
}
