import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
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
                        <Col md={8}>
                            {/* Product name, Price, Description, and Rating Here */}
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus
                                    <Rating readonly size={20} initialValue={4} /> (5)
                                </ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            {/* Product status, quantity/ Add to Cart */}
                            <ListGroup>
                                {/* Product Quantity */}
                                <ListGroup.Item>
                                    <Form.Select size="lg" aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                {/* Add to Cart */}
                                <ListGroup.Item>
                                    <Button variant="danger">Add to Cart</Button>
                                </ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        {/* Reviews Here */}
                        <Col className="mt-5">
                            <h5>Reviews</h5>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    Submit Review Form
                    <Alert variant="danger">Login to Write a Review</Alert>
                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailsPage;