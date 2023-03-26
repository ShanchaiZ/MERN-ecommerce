import { Row, Col, Container, Image } from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";


const ProductDetailsPage = () => {
    return (
        <Container>
            {<AddedToCartMessageComponent />}
            <Row className="mt-5">
                <Col md={4}>
                    {/* Product Images Here */}
                    <Image fluid src="/images/category/tablets-category.jpg" />
                    <Image fluid src="/images/category/games-category.jpg" />
                    <Image fluid src="/images/category/books-category.jpg" />
                    <Image fluid src="/images/category/computers-category.jpg" />
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