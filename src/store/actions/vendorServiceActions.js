import VendorServiceActionTypes from "../actionTypes/vendorServiceActionTypes";

export const ServiceCreateStart = (data) => ({
  type: VendorServiceActionTypes.SERVICE_CREATE_START,
  payload: data,
});

export const ServiceCreateSuccess = (history) => ({
  type: VendorServiceActionTypes.SERVICE_CREATE_SUCCESS,
  paylod: history,
});

export const ServiceCreateFailed = (errorMessage) => ({
  type: VendorServiceActionTypes.SERVICE_CREATE_FAILED,
  payload: errorMessage,
});

export const ServiceStart = (data) => ({
  type: VendorServiceActionTypes.SERVICE_START,
  payload: data,
});

export const ServiceSuccess = (data) => ({
  type: VendorServiceActionTypes.SERVICE_SUCCESS,
  payload: data,
});

export const ServiceFailed = (errorMessage) => ({
  type: VendorServiceActionTypes.SERVICE_FAILED,
  payload: errorMessage,
});
