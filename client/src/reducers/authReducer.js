import {SET_CURRENT_USER, USER_LOADING} from "../actions/types";

const isEmpty = require("is-empty");

export const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const handlers = {
    [SET_CURRENT_USER]: (state, {payload}) => ({
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        loading: false
    }),
    [USER_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    DEFAULT: state => state
}

export function authReducer(state = initialState, action) {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}