import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/combineReducers";

const initialState = {};

const enhancer = compose(
    applyMiddleware(thunk)
);

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

export default store;