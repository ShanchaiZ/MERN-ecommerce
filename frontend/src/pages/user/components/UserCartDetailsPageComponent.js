import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useEffect, useState } from "react";

const UserCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal, addToCart, removeFromCart, userInfo, reduxDispatch, getUser }) => {

    //Initial Local State Hook:
    const [buttonDisabled, setButtonDisabled] = useState(false); //Intially set to Do not disable pay order button
    const [userAddress, setUserAddress] = useState(false); // Initially set to 

    // Changing item count in cart:
    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count));
    }

    // Removing Items from Cart function:
    const removeFromCartHandler = (productID, quantity, price) => {
        if (window.confirm("Are you sure?")) {
            reduxDispatch(removeFromCart(productID, quantity, price));
        }
    }

    // Disable button after reload:
    useEffect(() => {
        getUser()
            .then((data) => {
                if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
                    setButtonDisabled(true);
                } else {
                    // if user data validation is sucessful:
                    setUserAddress({
                        address: data.address,
                        city: data.city,
                        country: data.country,
                        zipCode: data.zipCode,
                        state: data.state,
                        phoneNumber: data.phoneNumber
                    });
                }
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [userInfo._id])

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Cart Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        {/* Shipping Information */}
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                            <b>Address</b>: {userAddress.address}, {userAddress.city} {userAddress.state}, {userAddress.zipCode}<br />
                            <b>Phone Number</b>: {userAddress.phoneNumber}<br />
                        </Col>
                        {/* Payment Method */}
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select>
                                <option value="pp">PayPal</option>
                                <option value="cod">Cash on Delivery (delivery may be delayed)</option>
                            </Form.Select>
                        </Col>
                        {/* Deliver Alerts */}
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">Product Not Delivered. Please Complete Your Profile With Correct Information (address, city, etc).</Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">Outstanding Balance in Cart</Alert>
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
                                removeFromCartHandler={removeFromCartHandler}
                                changeCount={changeCount}
                            />
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
                                <Button size="lg" variant="success" type="Button" disabled={buttonDisabled}>
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

export default UserCartDetailsPageComponent;