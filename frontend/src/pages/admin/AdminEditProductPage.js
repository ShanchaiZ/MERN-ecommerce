import { Container, Row, Col, Form, Button, CloseButton, Table, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const onHover = {
    cursor: "pointer",
    position: "absolute",
    right: "3px",
    top: "-15px",
    transform: "scale(1.5)",
}

const AdminEditProductPage = () => {
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
                {/* Edit Product Form*/}
                <Col md={6}>
                    <h1>Edit A Product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* Name of Product */}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name of Product</Form.Label>
                            <Form.Control name="name" type="text" required defaultValue="Toshiba" />
                        </Form.Group>
                        {/* Product Description */}
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows={3} required defaultValue="Product Description: Price is tough 2 beat!" />
                        </Form.Group>
                        {/* Product Quantity in Stock */}
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Number of Product in Stock</Form.Label>
                            <Form.Control name="count" type="number" required defaultValue="3" />
                        </Form.Group>
                        {/* Product Price */}
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="text" required defaultValue="44.44" />
                        </Form.Group>
                        {/* Product Category Dropdown */}
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Select aria-label="productCategory">
                                <option>Choose Category</option>
                                <option value="1">Books</option>
                                <option value="2">Laptop</option>
                                <option value="3">Games</option>
                            </Form.Select>
                        </Form.Group>

                        <Row className="mt-5">
                            {/* Choose Category subdivision: Attribute  */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Choose Attribute and Set Values</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="productCategory">
                                        <option>Choose Attribute</option>
                                        <option value="color">Color</option>
                                        <option value="shape">Shape</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {/* Choose Category subdivision: Attribute Value  */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="productCategory">
                                        <option>Choose Attribute Value</option>
                                        <option value="1">Red</option>
                                        <option value="2">Yellow</option>
                                        <option value="3">Green</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Table for Displaying Attribute, Value and Deletion */}
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>attr value</td>
                                        <td>
                                            <CloseButton />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>

                        {/* Create new Attribute and Attribute Value */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create New Attribute</Form.Label>
                                    <Form.Control disabled={false} required={true} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control disabled={false} required={true} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert variant="primary">After typing attribute key and value, please enter on one of the fields</Alert>

                        {/* Product Image Upload */}
                        <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                            <Form.Label>Images</Form.Label>
                            <Row>
                                <Col style={{ position: "relative" }} xs={3}>
                                    <Image src="/images/category/books-category.jpg" fluid />
                                    <i style={onHover} className="bi bi-x-circle text-danger"></i>
                                </Col>
                                <Col style={{ position: "relative" }} xs={3}>
                                    <Image src="/images/category/videos-category.jpg" fluid />
                                    <i style={onHover} className="bi bi-x-circle text-danger"></i>
                                </Col>
                                <Col style={{ position: "relative" }} xs={3}>
                                    <Image src="/images/category/computers-category.jpg" fluid />
                                    <i style={onHover} className="bi bi-x-circle text-danger"></i>
                                </Col>
                            </Row>
                            <Form.Control type="file" multiple required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Col>
                {/* Go Back to Admin Products button */}
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">Go Back </Link>
                </Col>
            </Row>
        </Container>
    )
};

export default AdminEditProductPage;