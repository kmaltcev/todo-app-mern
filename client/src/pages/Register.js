import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {registerUser, validateInput} from "../actions/authActions";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {EMAIL, PASS_REPEAT, PASSWORD, USERNAME} from "../actions/types";

const Register = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const {errors, auth} = useSelector(state => state)

    const onChange = ({target}) => {
        const validator = validateInput[target.id](target.value)
        if (!validator.regex) {
            errors[target.id] = validator.text
        } else delete errors[target.id]
        setUser({...user, [target.id]: target.value})
    }

    const onRegistration = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation()
        }
        dispatch(registerUser(user, history))
    }

    if (auth.isAuthenticated) {
        history.push("/dashboard");
    }

    return (
        <Container fluid className="reg-container align-items-center">
            <Row>
                <Col>
                    <h2>
                        <b>Register</b> below
                    </h2>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </Col>
                <Form noValidate onSubmit={onRegistration}>
                    <FormGroup className="mb-3" controlId={USERNAME}>
                        <FormLabel>Name</FormLabel>
                        <FormControl required type={USERNAME}
                                     placeholder="Enter your name"
                                     onChange={onChange}
                                     isInvalid={errors?.username}
                                     isValid={!errors?.username && user?.username}/>
                        <Form.Control.Feedback type={errors?.username ? "invalid" : "valid"}>
                            {errors?.username || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId={EMAIL}>
                        <FormLabel>Email</FormLabel>
                        <FormControl required type={EMAIL}
                                     placeholder="Enter email"
                                     onChange={onChange}
                                     isInvalid={errors?.email}
                                     isValid={!errors?.email && user?.email}/>
                        <Form.Control.Feedback type={errors?.email ? "invalid" : "valid"}>
                            {errors?.email || "Looks good!"}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId={PASSWORD}>
                        <FormLabel>Password</FormLabel>
                        <FormControl required type={PASSWORD}
                                     placeholder="Password"
                                     onChange={onChange}
                                     isInvalid={errors?.password}
                                     isValid={!errors?.password && user?.password && (user?.password2 === user?.password)}/>
                        <Form.Control.Feedback type={errors?.password ? "invalid" : "valid"}>
                            {errors?.password || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId={PASS_REPEAT}>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl required type={PASSWORD}
                                     placeholder="Confirm Password"
                                     onChange={onChange}
                                     isInvalid={errors?.password2}
                                     isValid={!errors?.password2 && user?.password2 && (user?.password2 === user?.password)}/>
                        <Form.Control.Feedback type={errors?.password2 ? "invalid" : "valid"}>
                            {errors?.password2 || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <Button variant="primary" type="submit" style={{float: "right"}}>
                        Sign up
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Register