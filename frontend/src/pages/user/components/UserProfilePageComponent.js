import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

const UserProfilePageComponent = () => {

    // Password Matching Function:
    const onChange = () => {
        const password = document.querySelector("input[name=password]");
        const confirm = document.querySelector("input[name=confirmPassword]");
        if (confirm.value === password.value) {
            confirm.setCustomValidity("")
        } else {
            confirm.setCustomValidity("Passwords do not match!");
        }
    }

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
                    <h1>User Profile</h1>
                    {/* Client Side Form Validation from React Bootstrap Validation */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* First Name Field */}
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Your First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="John"
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
                                defaultValue="Doe"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Your Last Name</Form.Control.Feedback>
                        </Form.Group>

                        {/* Email Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                disabled
                                value="john@doe.com"
                            />
                            <Form.Text className="text-muted">If you want to change your email, remove account and create a new one with a new email address</Form.Text>
                        </Form.Group>

                        {/* Phone Number Field */}
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                defaultValue=""
                            />
                        </Form.Group>

                        {/* Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your house number and street name"
                                defaultValue=""
                            />
                        </Form.Group>

                        {/* City Field */}
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                defaultValue=""
                            />
                        </Form.Group>

                        {/* State Field */}
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your State"
                                defaultValue=""
                            />
                        </Form.Group>

                        {/* Country Field */}
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your country"
                                defaultValue=""
                            />
                        </Form.Group>

                        {/* Postal Code Field */}
                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Postal Code"
                                defaultValue=""
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
                                minLength={8}
                                onChange={onChange}
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
                            />
                            <Form.Control.Feedback type="invalid">Please Repeat Your Password. Both Passwords Should Match!</Form.Control.Feedback>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Update</Button>
                        
                        <Alert show={true} variant="danger">A User with that Email already exists!</Alert>
                        <Alert show={true} variant="info">Successfully Updated User Information!</Alert>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
};

export default UserProfilePageComponent;