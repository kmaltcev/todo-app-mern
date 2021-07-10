import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    Button, ButtonGroup, ButtonToolbar, Col, Row,
    Form, FormControl, FormGroup, FormLabel, Container
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, validateInput} from "../actions/authActions";
import {PASSWORD, USERNAME, HOST} from "../actions/types";
import {Google, FacebookRounded} from "@material-ui/icons";
import {Loader} from "../components/Loader";

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({})
    const [Fb, setFb] = useState(false)
    const [Gg, setGg] = useState(false)
    const [Pw, setPw] = useState(false)

    const {errors, auth} = useSelector(state => state)

    const onChange = ({target}) => {
        const validator = validateInput[target.id](target.value)
        if (!validator.regex) {
            errors[target.id] = validator.text
        } else delete errors[target.id]
        setUserDetails({...userDetails, [target.id]: target.value})
    }

    const onLogin = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            setPw(false)
            event.stopPropagation();
        }
        else {
            setPw(true)
            dispatch(loginUser(userDetails))
        }
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
                                     isValid={!errors?.username && userDetails?.username}/>
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
                                     isValid={!errors?.password && userDetails?.password}/>
                        <Form.Control.Feedback type={errors?.password ? "invalid" : "valid"}>
                            {errors?.password || "Looks good!"}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <ButtonToolbar>
                        <ButtonGroup className="me-2">
                            <Button variant="primary" type="submit" href={`${HOST}/auth/facebook`}
                                    onClick={() => setFb(true)} disabled={Fb || Gg || Pw}>
                                {!Fb ? <FacebookRounded/> : <Loader options={{hidden: "visually-hidden", variant: "light"}}/>}
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-2">
                            <Button variant="outline-danger" type="submit" href={`${HOST}/auth/google`}
                                    onClick={() => setGg(true)} disabled={Fb || Gg || Pw}>
                                {!Gg ? <Google/> : <Loader options={{hidden: "visually-hidden", variant: "danger"}}/>}
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" style={{"marginLeft": "auto"}}>
                            <Button variant="primary" type="submit" disabled={Fb || Gg || Pw ||
                            (Object.keys(userDetails).length < 2 && Object.keys(errors).length === 0) }>
                                {!Pw ? <b>Login</b> : <Loader options={{variant: "light"}}/>}
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Form>
            </Row>
        </Container>
    )
}
export default Login;