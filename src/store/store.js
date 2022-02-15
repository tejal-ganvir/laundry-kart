import { createStore, applyMiddleware } from "redux";

import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import sagas from "../saga/sagas";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export default store;
