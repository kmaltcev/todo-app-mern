import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE} from "../actions/types";

export const initialState = {};

export const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload}) => ({
        ...state,
        notes: payload,
        loading: false
    }),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note._id !== payload)
    }),
    DEFAULT: state => state
}

export const notesReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}