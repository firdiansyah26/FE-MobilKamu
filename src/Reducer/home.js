import {
    SET_LOADER,
    INIT_MAIN_MENU,
    HANDLE_STATE_MAIN_MENU,
    GET_DATA_MAIN_MENU_SUCCESS
} from '../Config/ActionTypes'

const initState = {
    loader: false,
    listData: [],
    search: {
        country: ''
    }
}

export default function HomeState(state = initState, action) {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                loader: action.value
            }
        case HANDLE_STATE_MAIN_MENU: {
            return {
                ...state,
                search: { ...state.search, [action.field]: action.value }
            }
        }
        case INIT_MAIN_MENU: {
            return {
                ...state,
                search: {
                    country: ''
                }
            }
        }
        case GET_DATA_MAIN_MENU_SUCCESS: {
            return {
                ...state,
                listData: action.value
            }
        }
        default:
    }
    return state
}