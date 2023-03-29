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
                                <ListGroup.Item><h1>Product Name</h1></ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus
                                    <Rating readonly size={20} initialValue={4} /> (5)
                                </ListGroup.Item>
                                <ListGroup.Item>Price <span className="fw-bold">$123</span></ListGroup.Item>
                                <ListGroup.Item> Product Description:
                                    Lorem ipsum dolor sit amet. Hic neque repudiandae rem galisum eaque et quaerat fugiat et eius debitis quo fuga voluptates. Et sapiente tenetur hic consequatur autem sed consequatur galisum est laudantium nihil et quia error qui maxime tenetur in quisquam dolores.
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            {/* Product status, quantity/ Add to Cart */}
                            <ListGroup>
                                {/* Product Quantity */}
                                <ListGroup.Item>
                                    <ListGroup.Item>Status: in stock</ListGroup.Item>
                                    <ListGroup.Item>Price: <span className="fw-bold">$123</span> </ListGroup.Item>
                                    <ListGroup.Item> Quantity:
                                        <Form.Select size="lg" aria-label="Default select example">
                                            <option>1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </Form.Select>
                                    </ListGroup.Item>
                                </ListGroup.Item>

                                {/* Add to Cart */}
                                <ListGroup.Item>
                                    <Button variant="danger">Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        {/* Display All Reviews Here */}
                        <Col className="mt-5">
                            <h5>Reviews</h5>
                            <ListGroup variant="flush">
                                {Array.from({ length: 10 }).map((item, idx) => (
                                    <ListGroup.Item key={idx}>
                                        John Doe <br />
                                        <Rating readonly size={20} initialValue={4} /> <br />
                                        Date posted: March 29, 2023 <br />
                                        Product Review: This Product is the best on the market. I use it all the time!
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    Submit Review Form
                    <Alert variant="danger">Login to Write a Review</Alert>

                    {/* Review Form */}
                    <Form>
                        {/* Email Addresss */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Write a Review Here</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        {/* Submission */}
                        <Form.Group>
                            <Form.Select aria-label="Default select example">
                                <option>Your Rating:</option>
                                <option value="5">5 (Excellent)</option>
                                <option value="4">4 (Very Good)</option>
                                <option value="3">3 (Average)</option>
                                <option value="2">2 (Bad)</option>
                                <option value="1">1 (Terrible)</option>
                            </Form.Select>
                            <Button className="mb-3 mt-3" variant="primary">Submit Review</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailsPage;