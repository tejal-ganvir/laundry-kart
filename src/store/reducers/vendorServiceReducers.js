import VendorServiceActionTypes from "../actionTypes/vendorServiceActionTypes";

const intialState = {
  serviceDetails: [],
  isLoading: false,
  createDetails: null,
  laundryId: null,
  isSaved: false,
  errorMessage: null,
};

export const VendorServiceReducer = (
  state = intialState,
  { type, payload },
) => {
  switch (type) {
    case VendorServiceActionTypes.SERVICE_CREATE_START:
      return {
        ...state,
        isLoading: true,
        createDetail: payload,
        isSaved: false,
      };
    case VendorServiceActionTypes.SERVICE_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createDetail: payload,
        isSaved: true,
      };
    case VendorServiceActionTypes.SERVICE_CREATE_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    case VendorServiceActionTypes.SERVICE_START:
      return { ...state, isLoading: true, isSaved: false, laundryId: payload };
    case VendorServiceActionTypes.SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSaved: true,
      };
    case VendorServiceActionTypes.SERVICE_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
