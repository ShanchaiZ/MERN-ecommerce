import { Row, Col, Container, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CartPageComponent = ({ addToCart, cartItems, cartSubtotal, reduxDispatch }) => {

    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count));
    }

    return (
        <Container fluid>
            <Row className="mt-4">
                {/* Shopping Cart Items: */}
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent
                                // Added a temporary Js object as item component:
                                item={item} key={idx} changeCount={changeCount} />
                        ))}
                    </ListGroup>
                    <Alert variant="info">Your Cart is Empty!</Alert>
                </Col>

                {/* Price Subtotal and Checkout: */}
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Subtotal (2 Items)</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: <span className="fw-bold">$333</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <LinkContainer to="/user/cart-details">
                                <Button type="button">Proceed to Checkout</Button>
                            </LinkContainer>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default CartPageComponent;