import vendorProfileTypes from "../actionTypes/vendorProfileTypes";

const intialState = {
  profileDetails: {},
  isFinished: false,
  isLoading: false,
  vendorId: null,
  profile: null,
  errorMessage: null,
};

export const VendorProfileReducer = (
  state = intialState,
  { type, payload },
) => {
  switch (type) {
    case vendorProfileTypes.PROFILE_START:
      return { ...state, isLoading: true, vendorId: payload };
    case vendorProfileTypes.PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileDetails: payload,
      };
    case vendorProfileTypes.PROFILE_FAILED:
      return { ...state, isLoading: false, errorMessage: payload };
    case vendorProfileTypes.PROFILE_CREATE:
      return { ...state, isLoading: true, profile: payload };
    default:
      return state;
  }
};
