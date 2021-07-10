import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    Button, ButtonGroup, ButtonToolbar, Col, Row,
    Form, FormControl, FormGroup, FormLabel, Container
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, validateInput} from "../../actions/authActions";
import {PASSWORD, USERNAME} from "../../actions/types";
import {Google, FacebookRounded} from "@material-ui/icons";

const Login = () => {
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

    const onLogin = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        dispatch(loginUser(user))
    }

    if (auth.isAuthenticated) {
        history.push("/dashboard");
    }

    return (
        <Container fluid className="reg-container align-items-center">
            <Row>
                <Col>
                    <h2>
                        <b>Login</b> below
                    </h2>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </Col>
                <Form noValidate onSubmit={onLogin}>
                    <FormGroup className="mb-3" controlId={USERNAME}>
                        <FormLabel>Name</FormLabel>
                        <FormControl required
                                     type={USERNAME}
                                     placeholder="Enter your name"
                                     onChange={onChange}
                                     isInvalid={errors?.username}
                                     isValid={!errors?.username && user?.username}/>
                        <Form.Control.Feedback type={errors?.username ? "invalid" : "valid"}>
                            {errors?.username || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId={PASSWORD}>
                        <FormLabel>Password</FormLabel>
                        <FormControl required type={PASSWORD}
                                     placeholder="Password"
                                     onChange={onChange}
                                     isInvalid={errors?.password}
                                     isValid={!errors?.password && user?.password}/>
                        <Form.Control.Feedback type={errors?.password ? "invalid" : "valid"}>
                            {errors?.password || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <ButtonToolbar>
                        <ButtonGroup className="me-2">
                            <Button variant="primary" type="submit" href="http://localhost:5000/auth/facebook">
                                <FacebookRounded/>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-2">
                            <Button variant="outline-danger" type="submit" href="http://localhost:5000/auth/google">
                                <Google/>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" style={{"marginLeft": "auto"}}>
                            <Button variant="primary" type="submit">
                                Login With Password
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Form>
            </Row>
        </Container>
    )
}

export default Login;