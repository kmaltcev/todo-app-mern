import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../actions/authActions";

const PrivateRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    // const fetchData = async () => {
    //     await
    // }

    useEffect(() => {
        if (!auth.isAuthenticated)
            dispatch(getCurrentUser())
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
}
export default PrivateRoute;