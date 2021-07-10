import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {ListAlt} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {NavItem} from "../components/NavItem";

export const Navigation = () => {
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
                                <NavItem options={{to: "/", label: "Home"}}/>
                                <NavItem options={{to: "/login", label: "Log in"}}/>
                                <NavItem options={{to: "/register", label: "Registration"}}/>
                            </Nav>) :
                        (<Nav>
                            <NavItem options={{to: "/", label: "Logout", onClick: onLogoutClick}}/>
                        </Nav>)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}