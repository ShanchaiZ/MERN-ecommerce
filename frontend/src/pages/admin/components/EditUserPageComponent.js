import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {

    // React Local State Variable:
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([]); //Initially list of user to edit is an empty array
    const [isAdminState, setIsAdminState] = useState(false); //Initially User is not an admin and see if admin checkbox is checked.
    const [updateUserResponseState, setUpdateUserResponseState] = useState({ message: "", error: "" }); //Initally the message and error is empty string

    const { id } = useParams(); //used to read id parameter in the url
    const navigate = useNavigate();

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
            updateUserApiRequest(id, name, lastName, email, isAdmin)
                .then(data => {
                    if (data === "User profile updated") {
                        navigate("/admin/users");
                    }
                })
                .catch(er => {
                    setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
                })
        }
        setValidated(true);
    };


    //React UseEffect after browser load:
    useEffect(() => {
        fetchUser(id)
            .then(data => {
                setUser(data);
                setIsAdminState(data.isAdmin);
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
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
                            <Form.Control name="name" type="text" required defaultValue={user.name} />
                        </Form.Group>
                        {/* User Last Name */}
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" required defaultValue={user.lastName} />
                        </Form.Group>
                        {/* User Email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required defaultValue={user.email} />
                        </Form.Group>

                        {/* Is User an Admin? */}
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check name="isAdmin" type="checkbox" label="is admin" checked={isAdminState} onChange={(e) => setIsAdminState(e.target.checked)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Update User</Button>
                        {updateUserResponseState.error}
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