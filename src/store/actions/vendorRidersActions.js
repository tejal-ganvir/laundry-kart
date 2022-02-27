import VendorRiderActionTypes from "../actionTypes/vendorRiderActionsTypes";

export const RiderCreateStart = (data) => ({
  type: VendorRiderActionTypes.RIDER_CREATE_START,
  payload: data,
});

export const RiderCreateSuccess = (history) => ({
  type: VendorRiderActionTypes.RIDER_CREATE_SUCCESS,
  paylod: history,
});

export const RiderCreateFailed = (errorMessage) => ({
  type: VendorRiderActionTypes.RIDER_CREATE_FAILED,
  payload: errorMessage,
});

export const RiderStart = () => ({
  type: VendorRiderActionTypes.VENDOR_RAIDER_START,
});

export const RiderSuccess = (data) => ({
  type: VendorRiderActionTypes.RIDER_SUCCESS,
  payload: data,
});

export const RiderFailed = (errorMessage) => ({
  type: VendorRiderActionTypes.RIDER_FAILED,
  payload: errorMessage,
});
