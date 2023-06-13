import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useEffect, useState } from "react";

const UserOrderDetailsPageComponent = ({ userInfo, getUser }) => {

    //Initial Local React State hooks 
    const [userAddress, setUserAddress] = useState({}); //initally an empty object

    // useEffect after page render:
    useEffect(() => {
        getUser()
            .then(data => {
                setUserAddress({
                    address: data.address,
                    city: data.city,
                    country: data.count,
                    zipCode: data.zipCode,
                    state: data.state,
                    phoneNumber: data.phoneNumber
                });
            })
            .catch((err) => console.log(err));
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
                            <b>Name</b>: {userInfo.name} {userInfo.lastName}<br />
                            <b>Address</b>: {userAddress.address} {userAddress.city}, {userAddress.state} {userAddress.zipCode} <br />
                            <b>Phone Number:</b>: {userAddress.phoneNumber} <br />
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
                            <CartItemComponent
                                // Added a temporary Js object as item component:
                                item={{ image: { path: "/images/category/monitors-category.jpg" }, name: "Product Name", price: 25, quantity: 3, count: 12 }}
                                key={idx} />
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
                                    Pay for the Order
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default UserOrderDetailsPageComponent;