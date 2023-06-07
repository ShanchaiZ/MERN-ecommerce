import { Row, Col, Container, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CartPageComponent = ({ addToCart, cartItems, cartSubtotal, reduxDispatch }) => {

    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count));
    }

    const removeFromCartHandler = (productID, quantity, price) => {
        if (window.confirm("Are you sure?")) {
            console.log(productID);
            console.log(quantity);
            console.log(price);
        }
    }

    return (
        <Container fluid>
            <Row className="mt-4">
                {/* Shopping Cart Items: */}
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {/* Cart Item Message visibility: If Cart is empty, show message... */}
                    {cartItems.length === 0 ? (
                        <Alert variant="info">Your Cart is Empty!</Alert>
                    ) : (
                        // OtherWise, show cart items...:
                        <ListGroup variant="flush">
                            {cartItems.map((item, idx) => (
                                <CartItemComponent
                                    // Items in a Cart:
                                    item={item} key={idx} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler} />
                            ))}
                        </ListGroup>
                    )}
                </Col>

                {/* Price Subtotal and Checkout: */}
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.length} {cartItems.length === 1 ? "Product" : "Products"})</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <LinkContainer to="/user/cart-details">
                                <Button disabled={cartSubtotal === 0} type="button">Proceed to Checkout</Button>
                            </LinkContainer>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default CartPageComponent;