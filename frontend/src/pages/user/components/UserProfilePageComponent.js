import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

const UserProfilePageComponent = ({ updateUserApiRequest, fetchUser, userInfo }) => {

    // Initial State of the Registration fields using React Hooks:
    const [validated, setValidated] = useState(false); //Initially the validation state is false => not validated
    const [updateUserResponseState, setUpdateUserResponseState] = useState({ success: "", error: "" }); //inital state of user update alerts are empty strings
    const [passwordsMatchState, setPasswordsMatchState] = useState(true); //Inital State of password matching is they are always matching (the empty string)
    const [user, setUser] = useState({}); // Initial State of User is empty object


    //React UseEffect after browser load:
    useEffect(() => {
        fetchUser(userInfo._id)
            .then((data) => setUser(data))
            .catch((er) => console.log(er));
    }, [fetchUser, userInfo._id])

    // Password Matching Function:
    const onChange = () => {
        const password = document.querySelector("input[name=password]");
        const confirmPassword = document.querySelector("input[name=confirmPassword]");
        if (confirmPassword.value === password.value) {
            setPasswordsMatchState(true);
        } else {
            setPasswordsMatchState(false);
        }
    }

    // Submit Form Handler button:
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // Read all the field values in the form for Profile Update form submission:
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const country = form.country.value;
        const zipCode = form.zipCode.value;
        const city = form.city.value;
        const state = form.state.value;
        const password = form.password.value;


        if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
            updateUserApiRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password)
                .then(data => {
                    setUpdateUserResponseState({ success: data.success, error: "" })
                })
                .catch((er) =>
                    setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
                );
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
                                defaultValue={user.name}
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
                                defaultValue={user.lastName}
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Your Last Name</Form.Control.Feedback>
                        </Form.Group>

                        {/* Email Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                disabled
                                value={user.email}
                            />
                            <Form.Text className="text-muted">If you want to change your email, remove account and create a new one with a new email address</Form.Text>
                        </Form.Group>

                        {/* Phone Number Field */}
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                defaultValue={user.phoneNumber}
                                name="phoneNumber"
                            />
                        </Form.Group>

                        {/* Address Field */}
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your house number and street name"
                                defaultValue={user.address}
                                name="address"
                            />
                        </Form.Group>

                        {/* City Field */}
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                defaultValue={user.city}
                                name="city"
                            />
                        </Form.Group>

                        {/* State Field */}
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your State"
                                defaultValue={user.state}
                                name="state"
                            />
                        </Form.Group>

                        {/* Country Field */}
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your country"
                                defaultValue={user.country}
                                name="country"
                            />
                        </Form.Group>

                        {/* Postal Code Field */}
                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Postal Code"
                                defaultValue={user.zipCode}
                                name="zipCode"
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
                                isInvalid={!passwordsMatchState}
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
                                isValid={!passwordsMatchState}
                            />
                            <Form.Control.Feedback type="invalid">Please Repeat Your Password. Both Passwords Should Match!</Form.Control.Feedback>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Update</Button>

                        <Alert show={updateUserResponseState && updateUserResponseState.error !== ""} variant="danger">
                            A Error has occurred!
                        </Alert>
                        <Alert show={updateUserResponseState && updateUserResponseState.success === "User Profile Updated"} variant="info">
                            Successfully Updated User Profile!
                        </Alert>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
};

export default UserProfilePageComponent;