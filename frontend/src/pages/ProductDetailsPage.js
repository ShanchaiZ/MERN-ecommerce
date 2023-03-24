import { Row, Col, Container } from "react-bootstrap";

const ProductDetailsPage = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={4}>
                    Product Images Here
                </Col>

                <Col md={8}>
                    <Row>
                        <Col md={8}>product name, price, description, and rating</Col>
                        <Col md={4}>Product status, quantity/ Add to Cart</Col>
                    </Row>
                    <Row>
                        <Col className="mt-5">
                            <h5>Reviews</h5>
                        </Col>
                    </Row>
                    <hr />
                    Submit Review Form
                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailsPage;