import vendorProfileTypes from "../actionTypes/vendorProfileTypes";

export const ProfileStart = (data) => ({
  type: vendorProfileTypes.PROFILE_START,
  payload: data,
});

export const ProfileSuccess = (data) => ({
  type: vendorProfileTypes.PROFILE_SUCCESS,
  payload: data,
});

export const ProfileError = (errorMessage) => ({
  type: vendorProfileTypes.PROFILE_ERROR,
  payload: errorMessage,
});

export const AddProfileStart = (data) => ({
  type: vendorProfileTypes.PROFILE_CREATE,
  payload: data,
});
