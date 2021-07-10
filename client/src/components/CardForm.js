import React from "react";
import {FormControl, FormGroup} from "react-bootstrap";

export const CardForm = ({options}) => {
    return (
        <FormGroup className="mb-1" controlId={options?.id}>
            <FormControl className={options?.className}
                         size={options?.size}
                         as={options?.as}
                         type={options?.type}
                         placeholder={options?.placeholder}
                         defaultValue={options?.defaultValue}
                         title={options?.title}
                         onChange={options?.onChange}
                         required={options?.required}
            />
        </FormGroup>
    )
}