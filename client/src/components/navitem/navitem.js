import {Link} from "react-router-dom";
import {Button, Nav} from "react-bootstrap";
import React from "react";

export const Navitem = ({options}) => {
    return (
        <Nav.Item>
            <Link to={options.to} className={"my-nav-link"}>
                <Button type="submit"
                        className={"text-btn nav-btn"}
                        onClick={options.onClick}>
                    {options.label}
                </Button>
            </Link>
        </Nav.Item>
    )
}