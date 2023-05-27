import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPageComponent = ({ loginUserApiRequest }) => {
    // Form Functions Defined:
    const [validated, setValidated] = useState(false); //initially no validation
    const [loginUserResponseState, setLoginUserResponseState] = useState({
        success: "", error: "", loading: false
    }); //initial state when user visits a page

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget.elements;

        const email = form.email.value;
        const password = form.password.value;
        const doNotLogout = form.doNotLogout.checked;

        if (event.currentTarget.checkValidity() === true && email && password) {
            loginUserApiRequest(email, password, doNotLogout)
                .then((res) => console.log(res))
                .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data));
        }

        setValidated(true);
    };

    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Login</h1>
                    {/* Client Side Form Validation from React Bootstrap Validation */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        {/* Email Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email Address"
                                name="email"
                            />
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter Your Password Here"
                                name="password"
                            />
                            <Form.Text className="text-muted">A Password Should Have at least 8 characters!</Form.Text>
                            <Form.Control.Feedback type="invalid">Please Enter A Valid Password</Form.Control.Feedback>
                        </Form.Group>

                        {/* Persistent Login */}
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                name="doNotLogout"
                                label="Do Not Logout"
                            />
                        </Form.Group>

                        {/* No Account: Redirect to Register*/}
                        <Row className="pb-2">
                            <Col>
                                Create an New Account by <Link to={"/register"}> Registering</Link> here!
                            </Col>
                        </Row>

                        {/* Submit Button with Spinner */}
                        <Button variant="primary" type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Login
                        </Button>

                        <Alert show={loginUserResponseState && loginUserResponseState.error === "Incorrect Credentials"} variant="danger">
                            Please enter the correct login credentials!
                        </Alert>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
};

export default LoginPageComponent;