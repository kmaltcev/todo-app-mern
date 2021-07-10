import React from "react";
import {Link} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import "./landing.css"
import {useSelector} from "react-redux";

let Landing = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth)

    return (
        <Container className="reg-container align-items-center">
            <Row>
                <h4>
                    <b>Welcome</b> to Let's Do!{" "}
                </h4>
                <p>Todo application built with MERN stack by Konstantin Maltcev and Tal Kotler</p>
                {!auth.isAuthenticated ? (
                    <>
                        <Col className="align-items-stretch">
                            <Link to="/register">
                                <Button variant="outline-primary" size="lg">Registration</Button>{' '}
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/login">
                                <Button variant="outline-success" size="lg">Log In</Button>{' '}
                            </Link>
                        </Col>
                    </>
                ) : (
                    <>
                        <p>Hi <b>{auth.user.username}</b>, you already logged in!</p>
                        <Col style={{"textAlignLast": "center"}}>
                            <Link to="/dashboard">
                                <Button variant="warning" size="lg">Dashboard</Button>{' '}
                            </Link>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    )
}
export default Landing;

