import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const EditUserPageComponent = ({ updateUserApiRequest }) => {
    const [validated, setValidated] = useState(false);
    // Function: validation function when submit button is clicked
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Container className="justified-content-md-content mt-5">
            <Row>
                {/* Edit User Form*/}
                <Col md={6}>
                    <h1>Edit A User</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* User First Name*/}
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="name" type="text" required defaultValue="John" />
                        </Form.Group>
                        {/* User Last Name */}
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" required defaultValue="Doe" />
                        </Form.Group>
                        {/* User Email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required defaultValue="john@doe.com" />
                        </Form.Group>

                        {/* Is User an Admin? */}
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check name="isAdmin" type="checkbox" label="is admin" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Update User</Button>
                    </Form>
                </Col>
                {/* Go Back to Admin Users Page */}
                <Col md={2}>
                    <Link to="/admin/users" className="btn btn-info my-3">Go Back</Link>
                </Col>
            </Row>
        </Container>
    )
};

export default EditUserPageComponent;