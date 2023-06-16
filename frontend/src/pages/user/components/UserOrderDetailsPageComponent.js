import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

// Used for local State changes:
import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";


const UserOrderDetailsPageComponent = ({ userInfo, getUser, getOrder, loadPayPalScript }) => {

    //Initial Local React State hooks 
    const [userAddress, setUserAddress] = useState({}); //initally an empty object
    const [paymentMethod, setPaymentMethod] = useState(""); //initially an empty string
    const [isPaid, setIsPaid] = useState(false); //initially order is not paid = false
    const [orderButtonMessage, setOrderButtonMessage] = useState(""); //initally message on the order button will be emptry string
    const [cartItems, setCartItems] = useState([]); //initially page starts with an empty cart array
    const [cartSubtotal, setCartSubtotal] = useState(0); // initially set to 0 as there is nothing in cart.
    const [isDelivered, setIsDelivered] = useState(false); //initially order is not delivered = false
    const [buttonDisabled, setButtonDisabled] = useState(false); // initially button is not disabled

    const paypalContainer = useRef(); //Special React Object that allows values to persist between renders
    console.log(paypalContainer);

    const { id } = useParams();

    // useEffect after page render to dynamically update User Address and phonenumber:
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

    // Dynamically update the cart items on the page:
    useEffect(() => {
        getOrder(id)
            .then(data => {
                setPaymentMethod(data.paymentMethod);
                setCartItems(data.cartItems);
                setCartSubtotal(data.orderTotal.cartSubtotal);
                data.isDelivered ? setIsDelivered(data.deliveredAt) : setIsDelivered(false); //find isDelivered and setIsDelivered to the time of Delivery, otherwise set to false.
                data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false); //find IsPad and set IsPad to the time of paid, otherwise set to false.
                if (data.isPaid) {
                    setOrderButtonMessage("Your order is completed!");
                    setButtonDisabled(true);
                } else {
                    if (data.paymentMethod === "pp") {
                        setOrderButtonMessage("Pay for the order");
                    } else if (data.paymentMethod === "cod") {
                        setButtonDisabled(true);
                        setOrderButtonMessage("Wait for your order. Pay upon delivery");
                    }
                }
            })
            .catch((err) => console.log(err));
    }, [])


    // OrderHandler Button:
    const OrderHandler = () => {
        setButtonDisabled(true); //disable button after clicking
        if (paymentMethod === "pp") {
            setOrderButtonMessage("To Pay for your order, select one of the buttons below:");
            if (!isPaid) {
                loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
            }
        } else {
            setOrderButtonMessage("Your order is placed! Thank you!")
        }
    }

    // Update State after Order:
    const updateStateAfterOrder = (paidAt) => {
        setOrderButtonMessage("Thank you for your payment!");
        setIsPaid(paidAt);
        setButtonDisabled(true);
        paypalContainer.current.style = "display: none";
    }


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
                            <Form.Select value={paymentMethod} disabled={true}>
                                <option value="pp">PayPal</option>
                                <option value="cod">Cash on Delivery (delivery may be delayed)</option>
                            </Form.Select>
                        </Col>
                        {/* Deliver Alerts */}
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                                    {isDelivered ? <>Delivered at: {isDelivered}</> : <>Product Not Delivered</>}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                                    {isPaid ? <>Paid on: {isPaid}</> : <>Outstanding Balance in Cart</>}
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />

                    {/* Product Order Items */}
                    <h2>Order Items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent
                                item={item}
                                key={idx}
                                orderCreated={true} />
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
                                <Button size="lg" onClick={OrderHandler} variant="success" type="Button" disabled={buttonDisabled}>
                                    {orderButtonMessage}
                                </Button>
                            </div>
                            {/* Paypal Payment Buttons: */}
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div ref={paypalContainer} id="paypal-container-element"></div>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default UserOrderDetailsPageComponent;