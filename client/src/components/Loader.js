import React from "react"
import {Spinner} from "react-bootstrap";

export const Loader = ({options}) => {
    const animations = ["border", "grow"]
    return (
        <>
            <Spinner
                as="span"
                size={options?.size || "sm"}
                role="status"
                aria-hidden="true"
                variant={options?.variant}
                animation={animations[Math.floor((Math.random() * 10) % 2)]}/>
            <span className={options?.hidden}>Loading...</span>
        </>
    )
}