import * as actionType from '../Config/ActionTypes'

export function setLoader(value) {
    return (dispatch, getState) => {
        dispatch({ type: actionType.SET_LOADER, value })
    }
}

export function getData(value) {
    return (dispatch, getState) => {
        dispatch({ type: actionType.GET_DATA_MAIN_MENU, value })
    }
}

export function initForm() {
    return (dispatch, getState) => {
        dispatch({ type: actionType.INIT_MAIN_MENU })
    }
}

export function handleState(property, value) {
    return (dispatch, getState) => {
        dispatch({ type: actionType.HANDLE_STATE_MAIN_MENU, field: property, value: value })
    }
}

export const actions = {
    getData,
    initForm,
    setLoader,
    handleState
}