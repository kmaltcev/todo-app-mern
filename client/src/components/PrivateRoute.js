import React, {useEffect, Suspense} from "react";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../actions/authActions";
import {Loader} from "./Loader";
import {Container} from "react-bootstrap";

const PrivateRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)


    useEffect(() => {
        if (!auth.isAuthenticated) {
            dispatch(getCurrentUser())
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            {...rest}
            render={props =>
                <Suspense fallback={
                    <Container fluid className="reg-container align-items-center">
                        <Loader options={{size: "xl", variant: "primary"}}/>
                    </Container>
                }>
                    <Component {...props} />
                </Suspense>
            }
        />
    );
}

export default PrivateRoute;