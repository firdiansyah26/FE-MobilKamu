import { all } from 'redux-saga/effects';
import Home from './Sagas/home';
export default function* rootSaga(getState) {
  yield all([
    Home()
  ]);
}
