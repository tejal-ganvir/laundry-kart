import { all, call, put, takeLatest } from "redux-saga/effects";
import { setOrderStatus } from "../services/VendorOrders/vendorOrderService";
import {
  OrderStatusFailed,
  OrderStatusSuccess,
} from "../store/actions/vendorOrdersActions";
import VendorOrdersActionTypes from "../store/actionTypes/vendorOrdersActionTypes";

export function* VendorOrderCreateAsync(action) {
  try {
    const rider = yield setOrderStatus(action.payload);
    yield put(OrderStatusSuccess());
  } catch (error) {
    yield put(OrderStatusFailed(error.message));
  }
}

export function* VendorOrderCreateStart() {
  yield takeLatest(
    VendorOrdersActionTypes.ORDER_STATUS_START,
    VendorOrderCreateAsync,
  );
}

export function* VendorOrderSaga() {
  yield all([call(VendorOrderCreateStart)]);
}
