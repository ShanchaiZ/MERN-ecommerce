import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
    // Form Functions Defined:
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
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
                            />
                            <Form.Control.Feedback type="invalid">Please Enter A Valid Password</Form.Control.Feedback>
                        </Form.Group>

                        {/* Repeat Password Field */}
                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Repeat your Password"
                                name="confirmPassword"
                                minLength={8}
                            />
                            <Form.Control.Feedback type="invalid">Please Repeat Your Password. Both Passwords Should Match!</Form.Control.Feedback>
                        </Form.Group>

                        {/* User has Account Already*/}
                        <Row className="pb-2">
                            <Col>
                                Do you have already have an account?
                                <Link to={"/login"}> Login </Link> here!
                            </Col>
                        </Row>

                        <Button type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
};

export default RegisterPage;