import {
  ProfileSuccess,
  ProfileError,
} from "../store/actions/vendorProfileActions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import vendorProfileTypes from "../store/actionTypes/vendorProfileTypes";
import {
  getProfiledetails,
  setProfiledetails,
} from "../services/profile/vendorprofileservice";

export function* ProfileAsync(action) {
  try {
    const profile = yield getProfiledetails(action.payload);
    yield put(ProfileSuccess(profile));

  } catch (error) {
    yield put(ProfileError(error.message));
  }
}

export function* ProfileStart() {
  yield takeLatest(vendorProfileTypes.PROFILE_START, ProfileAsync);
}

export function* AddProfileAsync(action) {
  try {
    console.log(action.payload);
    const profile = yield setProfiledetails(action.payload);
    yield put(ProfileSuccess(profile));
  } catch (error) {
    yield put(ProfileError(error.message));
  }
}

export function* AddProfileStart() {
  yield takeLatest(vendorProfileTypes.PROFILE_CREATE, AddProfileAsync);
}

export function* VendorProfileSaga() {
  yield all([call(ProfileStart), call[AddProfileStart]]);
}
