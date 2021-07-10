import "./App.css"
import React from "react";
import store from "./store";
import jwt_decode from "jwt-decode";
import {Provider} from "react-redux";
import Landing from "./pages/landing/Landing";
import Login from "./pages/Login";
import {Navigation} from "./pages/Navigation";
import setAuthToken from "./utils/setAuthToken";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import PrivateRoute from "./components/PrivateRoute";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logoutUser());
            // Redirect to login
            window.location.href = "./";
        }
    }

    return (
        <Provider store={store}>
            <Router>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
