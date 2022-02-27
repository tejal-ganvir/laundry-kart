import VendorHistoryActionTypes from "../actionTypes/vendorHistoryActionTypes";

const intialState = {
  orderDetails: null,
  isLoading: false,
  laundryId: null,
  errorMessage: null,
};

export const VendorHistoryReducer = (
  state = intialState,
  { type, payload },
) => {
  switch (type) {
    case VendorHistoryActionTypes.HISTORY_START:
      return { ...state, isLoading: true, laundryId: payload };
    case VendorHistoryActionTypes.HISTORY_SUCCESS:
      return { ...state, isLoading: false, orderDetails: payload };
    case VendorHistoryActionTypes.HISTORY_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
