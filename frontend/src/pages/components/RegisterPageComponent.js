import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPageComponent = ({ registerUserApiRequest, reduxDispatch, setReduxUserState }) => {

    // Initial State of the Registration fields using React Hooks:
    const [validated, setValidated] = useState(false);
    const [registerUserResponseState, setRegisterUserResponseState] = useState({ success: "", error: "", loading: false });
    const [passwordMatchState, setPasswordMatchState] = useState(true); // Initial State of the password in the field matching ('empty field matches empty field)

    // Password Matching Function:
    const onChange = () => {
        const password = document.querySelector("input[name=password]");
        const confirmPassword = document.querySelector("input[name=confirmPassword]");
        if (confirmPassword.value === password.value) {
            setPasswordMatchState(true);
        } else {
            setPasswordMatchState(false);
        }
    }

    // Submit Form Handler button:
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // Read all the field values in the form for registration submission:
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;

        // If all the form elements exist and pass validation:
        if (event.currentTarget.checkValidity() === true && name && lastName && email && password && form.password.value === form.confirmPassword.value) {
            setRegisterUserResponseState({ loading: true });
            registerUserApiRequest(name, lastName, email, password)
                .then((data) => {
                    setRegisterUserResponseState({ success: data.success, loading: false });
                    reduxDispatch(setReduxUserState(data.userCreated));
                    // Once User Successfully created, set a session storage with userinfo and redirect to /user logic is moved in registerUserApiRequest function
                })
                .catch((er) =>
                    setRegisterUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
                );
        }

        setValidated(true);
    };

    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Register</h1>
                    {/* Client Side Form Validation from React Bootstrap Validation */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* First Name Field */}
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Your First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Your First Name</Form.Control.Feedback>
                        </Form.Group>

                        {/* Last Name Field */}
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Your Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Your Last Name</Form.Control.Feedback>
                        </Form.Group>

                        {/* Email Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email Address"
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">Please Enter A Valid Email Address</Form.Control.Feedback>
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter Your Password Here"
                                name="password"
                                minLength={8}
                                onChange={onChange}
                                isInvalid={!passwordMatchState}
                            />
                            <Form.Text className="text-muted">A Password Should Have at least 8 characters!</Form.Text>
                            <Form.Control.Feedback type="invalid">Please Enter A Valid Password</Form.Control.Feedback>
                        </Form.Group>

                        {/* Repeat Password Field */}
                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Repeat your Password"
                                name="confirmPassword"
                                minLength={8}
                                onChange={onChange}
                                isInvalid={!passwordMatchState}
                            />
                            <Form.Control.Feedback type="invalid">Please Repeat Your Password. Both Passwords Should Match!</Form.Control.Feedback>
                        </Form.Group>

                        {/* User has Account Already*/}
                        <Row className="pb-2">
                            <Col>
                                Do you already have an account? <Link to={"/login"}>Login</Link> here!
                            </Col>
                        </Row>

                        {/* Submit Button with Spinner */}
                        <Button type="submit">
                            {registerUserResponseState && registerUserResponseState.loading === true ? (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : ("")}
                            Submit
                        </Button>

                        {/* Alerts based on User State Response */}
                        <Alert show={registerUserResponseState && registerUserResponseState.error === "User Exists"} variant="danger">A User with that Email already exists!</Alert>
                        <Alert show={registerUserResponseState && registerUserResponseState.success === "User Created"} variant="success">Successfully Created A User!</Alert>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
};

export default RegisterPageComponent;