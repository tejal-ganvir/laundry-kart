import { all } from 'redux-saga/effects';
//import productsSaga from './products/saga';

export default function* rootSaga(getState) {
    yield all([
        //productsSaga(),
    ]);
}