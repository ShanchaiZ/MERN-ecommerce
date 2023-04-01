import { Row, Col, Container } from "react-bootstrap";

const CartPage = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                </Col>
                <Col md={4}>
                    <h3>Subtotal (2 Items)</h3>
                </Col>
            </Row>
        </Container>
    )
};

export default CartPage;