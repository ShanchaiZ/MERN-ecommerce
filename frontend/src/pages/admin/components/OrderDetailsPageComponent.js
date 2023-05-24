import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useParams } from "react-router-dom";// {useParams} is used to read dynamic parameter /:id
import { useState, useEffect } from "react";

const OrderDetailsPageComponent = ({ getOrder }) => {
    const { id } = useParams();

    // Initial State of the data fields using React Hooks:
    const [userInfo, setUserInfo] = useState({}); // Initially set to empty object
    const [paymentMethod, setPaymentMethod] = useState(""); // Initially set to empty field
    const [isPaid, setIsPaid] = useState(false); //Initallly set to NOT paid
    const [isDelivered, setIsDelivered] = useState(false); //Initallly set to NOT Delivered
    const [cartSubtotal, setCartSubtotal] = useState(0); //Initallly set to $0 
    const [buttonDisabled, setButtonDisabled] = useState(false); //Initallly set to clickable button but disabled if order is paid and delivered
    const [orderButtonMessage, setOrderButtonMessage] = useState("Mark as Delivered"); //Initallly set the button to "mark as delivered" text 
    const [cartItems, setCartItems] = useState([]);

    //React UseEffect after browser load:
    useEffect(() => {
        getOrder(id)
            .then((order) => {
                setUserInfo(order.user);
                setPaymentMethod(order.paymentMethod);
                order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
                order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false);
                setCartSubtotal(order.orderTotal.cartSubtotal);
                if (order.isDelivered) {
                    setOrderButtonMessage("Order is Completed");
                    setButtonDisabled(true);
                }
                setCartItems(order.cartItems);
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [getOrder, isDelivered, id])

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
                            <b>Phone Number</b>: {userInfo.phoneNumber} <br />
                        </Col>
                        {/* Payment Method */}
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select value={paymentMethod} disabled={true}>
                                <option value="pp">PayPal</option>
                                <option value="cod">Cash on Delivery (delivery may be delayed)</option>
                            </Form.Select>
                        </Col>
                        {/* Deliver Alerts */}
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                                    {isDelivered ? <>Delivered at {isDelivered}</> : <>Product Not Delivered</>}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                                    {isPaid ? <>Product Paid on {isPaid}</> : <>Not Paid Yet. Pending Payment</>}
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />

                    {/* Product Order Items */}
                    <h2>Order Items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent key={idx} item={item} orderCreated={true} />
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
                            Price of Item (after tax): <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Shipping: <span className="fw-bold">Included</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Tax: <span className="fw-bold">Included</span>
                        </ListGroupItem>
                        <ListGroupItem className="text-danger">
                            Total Price: <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className="d-grid">
                                <Button size="lg" disabled={buttonDisabled} variant="success" type="Button">
                                    {orderButtonMessage}
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