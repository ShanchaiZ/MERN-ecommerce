import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
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

                            <Form.Group controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    defaultValue="Mark"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
};

export default RegisterPage;