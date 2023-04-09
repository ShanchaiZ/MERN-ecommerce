import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminCreateProductPage = () => {
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
                {/* Go Back to Admin Products button */}
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">Go Back </Link>
                </Col>
                {/* Create a New Product */}
                <Col md={6}>
                    <h1>Create a New Product</h1>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Name of Product</Form.Label>
                            <Form.Control name="name" type="text" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    
                </Col>
            </Row>
        </Container>
    )
};

export default AdminCreateProductPage;