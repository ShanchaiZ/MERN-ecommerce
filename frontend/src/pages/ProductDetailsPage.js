import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";


// Image Display when Mouse Hover Effect:
import ImageZoom from "js-image-zoom";
import { useEffect } from "react";

// Redux:
import { useDispatch, useSelector } from "react-redux"; // Calling Actions done by Dispatch
import { addToCart } from "../redux/actions/cartActions"; //Caling the Action of adding to cart 
import { useParams } from "react-router-dom";//Used to read id from url parameter 

const ProductDetailsPage = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    console.log(id);

    const addToCartHandler = () => {
        dispatch(addToCart());
    }

    const products = useSelector((state) => state.cart.value);

    useEffect(() => {
        //Zoomed effects configuration:
        var options = {
            width: 400, // width of the source image (optional)
            zoomWidth: 500, //width of the zoomed image. Zoomed image height equals source image height (optional)
            // fillContainer: true,
            // zoomPosition: "bottom", //the position of the zoomed image
            scale: 1.5, //Zoom scale. if not provided, scale is calculated as natural image size / image size, provided in params (optional if zoomWidth param is provided)
            offset: { vertical: 0, horizontal: 10 } //Zoomed image offset displayed offset the original hover
        };
        // The Zoomed Effects on Images:
        new ImageZoom(document.getElementById("first"), options);
        new ImageZoom(document.getElementById("second"), options);
        new ImageZoom(document.getElementById("third"), options);
        new ImageZoom(document.getElementById("fourth"), options);
    })
    return (
        <Container>
            {<AddedToCartMessageComponent />}
            <Row className="mt-5">
                <Col style={{ zIndex: 1 }} md={4}>
                    {/* Product Images Here */}
                    <div id="first">
                        <Image crossOrigin="anonymous" fluid src="/images/category/tablets-category.jpg" />
                    </div>
                    <br />

                    <div id="second">
                        <Image fluid src="/images/category/games-category.jpg" />
                    </div>
                    <br />

                    <div id="third">
                        <Image fluid src="/images/category/books-category.jpg" />
                    </div>
                    <br />

                    <div id="fourth">
                        <Image fluid src="/images/category/computers-category.jpg" />
                    </div>
                    <br />
                </Col>

                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            {/* Product name, Price, Description, and Rating Here */}
                            <ListGroup variant="flush">
                                <ListGroup.Item><h1>Product Name {products}</h1></ListGroup.Item>
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
                                    <Button onClick={addToCartHandler} variant="danger">Add to Cart</Button>
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