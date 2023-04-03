import { Container, Row, Col, Form, Alert } from "react-bootstrap";

const UserOrderDetailsPage = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        {/* Shipping Information */}
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: John Doe <br />
                            <b>Address</b>: 123 Fake Street, New York City, NY 09876 <br />
                            <b>Phone Number:</b>: (123) 456-7890 <br />
                        </Col>
                        {/* Payment Method */}
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select disabled={false}>
                                <option value="pp">PayPal</option>
                                <option value="cod">Cash on Deliery (delivery may be delayed)</option>
                            </Form.Select>
                        </Col>
                        {/* Deliver Alerts */}
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">Product Not Delivered</Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">Paid on 03-10-2023</Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />

                </Col>
                <Col md={4}>
                    <h3>Order Summary</h3>
                </Col>
            </Row>
        </Container>
    )
};

export default UserOrderDetailsPage;