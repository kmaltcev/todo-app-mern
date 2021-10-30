import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    EMAIL, GET_ERRORS, PASS_REPEAT, PASSWORD,
    SET_CURRENT_USER, USER_LOADING, USERNAME, HOST
} from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios.post(`${HOST}/api/users/register`, userData)
        .then(_ => history.push("/login"))
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err?.response?.data
            })
        });
};

export const loginUser = (userData) => (dispatch) => {
    axios.post(`${HOST}/api/users/login`, userData)
        .then(res => {
            const {token} = res.data;
            // Set token to localStorage
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

function setToken(response, dispatch) {
    if (response.data.user) {
        const {token} = response.data;
        // Set token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    }
}

export const getCurrentUser = () => async (dispatch) => {
    dispatch(setUserLoading())
    axios.get(`${HOST}/auth/user`).then(response => {
        setToken(response, dispatch);
        return true
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        return false
    })
}
// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

export const validateInput = {
    [USERNAME]: val => ({
        text: "Your name either have a special character or too short",
        regex: /^\w[\w0-9-_.]{3,24}$/.test(val)
    }),
    [EMAIL]: val => ({
        text: "Your email must contain @ and .",
        regex: /^(\w\.?)+@[\w-.]+\.\w{2,4}$/.test(val)
    }),
    [PASSWORD]: val => ({
        text: "Your password must match and at least 6 characters long",
        regex: /.{6,30}$/.test(val)
    }),
    [PASS_REPEAT]: val => ({
        text: "Your password must match and at least 6 characters long",
        regex: /.{6,30}$/.test(val)
    })
}