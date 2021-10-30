import {GET_ERRORS, HIDE_WARNING, SHOW_WARNING} from "../actions/types";

export const initialState = {};

export const handlers = {
    [SHOW_WARNING]: (state, {payload}) => ({
        ...payload,
        visible: true
    }),
    [HIDE_WARNING]: state => ({
        ...state,
        visible: false
    }),
    [GET_ERRORS]: (state, {payload}) => ({
        ...state,
        ...payload
    }),
    DEFAULT: state => state
}

export const errorReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}