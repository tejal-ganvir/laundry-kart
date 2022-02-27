import VendorHistoryActionTypes from "../actionTypes/vendorHistoryActionTypes";

export const HistoryStart = (data) => ({
  type: VendorHistoryActionTypes.HISTORY_START,
  payload: data,
});

export const HistorySuccess = (history) => ({
  type: VendorHistoryActionTypes.HISTORY_SUCCESS,
  paylod: history
});

export const HistoryFailed = (errorMessage) => ({
  type: VendorHistoryActionTypes.HISTORY_FAILED,
  payload: errorMessage,
});
