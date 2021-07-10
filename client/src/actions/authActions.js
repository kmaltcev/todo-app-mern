import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {EMAIL, GET_ERRORS, PASS_REPEAT, PASSWORD, SET_CURRENT_USER, USER_LOADING, USERNAME} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(_ => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err?.response?.data
            })
        );
};
// Login - get user token
export const loginUser = (userData) => (dispatch) => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const {token} = res.data;
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
            }
        );
};

function setToken(response, dispatch) {
    // console.log("setToken: ", response)
    if (!!response.data.user) {
        // Save to localStorage
        // Set token to localStorage
        const {token} = response.data;
        localStorage.setItem("jwtToken", token);
        const {user} = response.data;
        localStorage.setItem("user", user);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    }
}

export const getCurrentUser = () => (dispatch) => {
    dispatch(setUserLoading())
    axios.get('/auth/user').then(response => {
        // console.log("getCurrentUser: ", response)
        setToken(response, dispatch);
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
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