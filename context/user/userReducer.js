
import { GET_USER, LOGIN_USER, SET_ERROR, SET_LOADING, UPDATE_SUCCESS, REGISTER_USER, LOGIN_FAILED, UPDATE_FAILED,
    SWITCH_DISPLAY, SUBSCRIPTION_SETTINGS } from './../types'

const userReducer = (state, action) => {
    switch (action.type) {
        case GET_USER:
        case UPDATE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_USER:
        case REGISTER_USER:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAILED:
        case REGISTER_USER:
            localStorage.removeItem('profile')
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        case UPDATE_FAILED:
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SWITCH_DISPLAY:
            return {
                ...state,
                loading: false,
                user: {...state.user, ...action.payload}
            }
        case SUBSCRIPTION_SETTINGS:
            return {
                ...state, 
                loading: false,
                user: {...state.user, subscriptionSetting: {...state.user?.subscriptionSetting, amount: action.payload} }
            }
        case SET_LOADING:
            return {
                ...state, loading: true
            }
        default:
            return state
    }
}

export default userReducer