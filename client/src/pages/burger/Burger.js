import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {ListAlt} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Navitem} from "../../components/navitem/navitem";

export const Burger = () => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const onLogoutClick = _ => {
        dispatch(logoutUser())
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand className="brand" href="/">
                    <ListAlt/>Let's Do!
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    {!auth.isAuthenticated ? (
                            <Nav>
                                <Navitem options={{to: "/", label: "Home"}}/>
                                <Navitem options={{to: "/login", label: "Log in"}}/>
                                <Navitem options={{to: "/register", label: "Registration"}}/>
                            </Nav>) :
                        (<Nav>
                            <Navitem options={{to: "/", label: "Logout", onClick: onLogoutClick}}/>
                        </Nav>)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}