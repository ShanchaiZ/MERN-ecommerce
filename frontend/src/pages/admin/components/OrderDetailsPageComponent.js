import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useParams } from "react-router-dom";// {useParams} is used to read dynamic parameter /:id
import { useState, useEffect } from "react";

const OrderDetailsPageComponent = ({ getOrder }) => {
    const { id } = useParams();

    // Initial State of the data fields using React Hooks:
    const [userInfo, setUserInfo] = useState({}); // Initially set to empty object

    useEffect(() => {
        getOrder(id)
            .then((order) => {
                setUserInfo(order.user);
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [])

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
                            <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                            <b>Address</b>:{userInfo.address}{userInfo.city}{userInfo.state}{userInfo.zipCode}<br />
                            <b>Phone Number:</b>: {userInfo.phoneNumber} <br />
                        </Col>
                        {/* Payment Method */}
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select disabled={true}>
                                <option value="pp">PayPal</option>
                                <option value="cod">Cash on Delivery (delivery may be delayed)</option>
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

                    {/* Product Order Items */}
                    <h2>Order Items</h2>
                    <ListGroup variant="flush">
                        {Array.from({ length: 3 }).map((item, idx) => (
                            <CartItemComponent key={idx} />
                        ))}
                    </ListGroup>
                </Col>

                <Col md={4}>
                    {/* Order Summary Section */}
                    <ListGroup>
                        <ListGroupItem>
                            <h3>Order Summary</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price of Item (after tax): <span className="fw-bold">$987</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Shipping: <span className="fw-bold">Included</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Tax: <span className="fw-bold">Included</span>
                        </ListGroupItem>
                        <ListGroupItem className="text-danger">
                            Total Price: <span className="fw-bold">$1234</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-grid">
                                <Button size="lg" variant="success" type="Button">
                                    Mark as Delivered
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default OrderDetailsPageComponent;