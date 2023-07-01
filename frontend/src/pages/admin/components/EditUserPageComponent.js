import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {

    // React Local State Variable:
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([]); //Initially list of user to edit is an empty array
    const [isAdmin, setIsAdmin] = useState(false); //Initially User is not an admin and see if admin checkbox is checked.

    const { id } = useParams(); //used to read id parameter in the url


    // Function: form validation when submit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const isAdmin = form.isAdmin.checked;
        if (event.currentTarget.checkValidity() === true) {
            updateUserApiRequest(name, lastName, email, isAdmin);
        }
        setValidated(true);
    };


    //React UseEffect after browser load:
    useEffect(() => {
        fetchUser(id)
            .then(data => {
                setUser(data);
                setIsAdmin(data.isAdmin);
            })
    }, [id])


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