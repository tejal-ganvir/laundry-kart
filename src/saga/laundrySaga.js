
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { postJSON } from "../services/axiosConfig/api";
import { laundryListFailed, laundryListSuccess } from "../store/actions/laundryActions";
import { GET_LAUNDRY_LIST } from "../store/actionTypes/laundryTypes";

function* fetchLaundryListSaga() {
    try {
        const response = yield call(postJSON, 'functions/getAllLaundryList', {});
        yield put(laundryListSuccess(response.result))
    } catch (error) {
        yield put(laundryListFailed(error));
    }
}

export function* watchLaundryFeed() {
    yield takeEvery(GET_LAUNDRY_LIST, fetchLaundryListSaga);
}


function* laundrySaga() {
    yield all([fork(watchLaundryFeed)]);
}

export default laundrySaga;