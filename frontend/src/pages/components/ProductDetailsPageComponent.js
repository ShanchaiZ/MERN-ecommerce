import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";


// Image Display when Mouse Hover Effect:
import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";//Used to read id from url parameter 

const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch, getProductDetails }) => {

    const { id } = useParams();

    // Initial State of React:
    const [quantity, setQuantity] = useState(1); //Initally quantity of product to add to cart is one.
    const [showCartMessage, setShowCartmessage] = useState(false); //Initially dont show the Cart messages.
    const [product, setProduct] = useState([]); //Initially an array of empty products
    const [loading, setLoading] = useState(true); //Initially loading message will display and be true
    const [error, setError] = useState(false); //Initially error message will be not display = false.

    const addToCartHandler = () => {
        reduxDispatch(addToCartReduxAction(id, quantity));
        setShowCartmessage(true);
    }


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

    // Display Product Details:
    useEffect(() => {
        getProductDetails(id)
            .then(data => {
                setProduct(data)
                setLoading(false);
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [])

    return (
        <Container>
            {<AddedToCartMessageComponent
                showCartMessage={showCartMessage}
                setShowCartmessage={setShowCartmessage}
            />}
            <Row className="mt-5">
                {loading ? (
                    <h2>Loading Product Details ...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
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
                                        <ListGroup.Item><h1>{product.name}</h1></ListGroup.Item>
                                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                        <ListGroup.Item>Morbi leo risus
                                            <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                                        </ListGroup.Item>
                                        <ListGroup.Item>Price <span className="fw-bold">${product.price}</span></ListGroup.Item>
                                        <ListGroup.Item> Product Description:
                                            {product.description}
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
                                                <Form.Select value={quantity} onChange={e => setQuantity(e.target.value)} size="lg" aria-label="Default select example">
                                                    <option>Choose:</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
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
                    </>
                )}
            </Row>
        </Container>
    )
};

export default ProductDetailsPageComponent;