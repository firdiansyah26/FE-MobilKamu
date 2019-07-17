import { all, call, put, takeEvery } from 'redux-saga/effects';
import { setLoader } from '../Action/home'
import { SET_LOADER, GET_DATA_MAIN_MENU, GET_DATA_MAIN_MENU_SUCCESS } from '../Config/ActionTypes'
import { GET } from '../Config/Service'
import Endpoint from '../Config/Endpoint'
import axios from 'axios';

export function* getData(action) {
    try {
        yield put(setLoader(true))
        
        const _response = yield call(GET, Endpoint.searchNameCountry + '/' + action.value, '')
        console.log("_response", _response)
        yield put({ type: GET_DATA_MAIN_MENU_SUCCESS, value: _response })

        yield put(setLoader(false))
    } catch (error) {

        yield put(setLoader(false))
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(GET_DATA_MAIN_MENU, getData),
    ])
}