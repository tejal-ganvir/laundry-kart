import VendorOrdersActionTypes from "../actionTypes/vendorOrdersActionTypes";

export const OrderStatusStart = (data) => ({
  type: VendorOrdersActionTypes.ORDER_STATUS_START,
  payload: data,
});

export const OrderStatusSuccess = (history) => ({
  type: VendorOrdersActionTypes.ORDER_STATUS_SUCCESS,
  paylod: history,
});

export const OrderStatusFailed = (errorMessage) => ({
  type: VendorOrdersActionTypes.ORDER_STATUS_FAILED,
  payload: errorMessage,
});
