import VendorOrdersActionTypes from "../actionTypes/vendorOrdersActionTypes";

const intialState = {
  orderDetails: [],
  isLoading: false,
  createDetails: null,
  orderId: null,
  isSaved: false,
  errorMessage: null,
};

export const VendorOrderReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case VendorOrdersActionTypes.ORDER_STATUS_START:
      return {
        ...state,
        isLoading: true,
        createDetail: payload,
        isSaved: false,
      };
    case VendorOrdersActionTypes.ORDER_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSaved: true,
      };
    case VendorOrdersActionTypes.ORDER_STATUS_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };

    default:
      return state;
  }
};
