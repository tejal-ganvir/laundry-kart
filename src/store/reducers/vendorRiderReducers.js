import VendorRiderActionTypes from "../actionTypes/vendorRiderActionsTypes";

const intialState = {
  riderDetail: null,
  riderDetails: [],
  isLoading: false,
  createDetails: null,
  laundryId: null,
  isSaved: false,
  errorMessage: null,
};

export const VendorRiderReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case VendorRiderActionTypes.RIDER_CREATE_START:
      return {
        ...state,
        isLoading: true,
        createDetail: payload,
        isSaved: false,
      };
    case VendorRiderActionTypes.RIDER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        riderDetail: payload,
        isSaved: true,
      };
    case VendorRiderActionTypes.RIDER_CREATE_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    case VendorRiderActionTypes.VENDOR_RAIDER_START:
      return { ...state, isLoading: true, isSaved: false };
    case VendorRiderActionTypes.RIDER_SUCCESS:
      return { ...state, isLoading: false, riderDetails: payload };
    case VendorRiderActionTypes.RIDER_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
