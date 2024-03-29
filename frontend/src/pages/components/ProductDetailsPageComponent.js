import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";


// Image Display when Mouse Hover Effect:
import ImageZoom from "js-image-zoom";
import { useEffect, useRef, useState } from "react";
import MetaComponent from "../../components/MetaComponent";

import { useParams } from "react-router-dom";//Used to read id from url parameter 

const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch, getProductDetails, userInfo, writeReviewApiRequest }) => {

    const { id } = useParams();

    // Initial State of React:
    const [quantity, setQuantity] = useState(1); //Initally quantity of product to add to cart is one.
    const [showCartMessage, setShowCartmessage] = useState(false); //Initially dont show the Cart messages.
    const [product, setProduct] = useState([]); //Initially an array of empty products
    const [loading, setLoading] = useState(true); //Initially loading message will display and be true
    const [error, setError] = useState(false); //Initially error message will be not display = false.
    const [productReviewed, setProductReviewed] = useState(false);

    const messagesEndRef = useRef(null);

    const addToCartHandler = () => {
        reduxDispatch(addToCartReduxAction(id, quantity));
        setShowCartmessage(true);
    }

    // Product image display and configuration:
    useEffect(() => {
        if (product.images) {
            //Zoomed effects configuration:
            var options = {
                width: 400, // width of the source image (optional)
                zoomWidth: 500, //width of the zoomed image. Zoomed image height equals source image height (optional)
                // fillContainer: true,
                // zoomPosition: "bottom", //the position of the zoomed image
                scale: 1.5, //Zoom scale. if not provided, scale is calculated as natural image size / image size, provided in params (optional if zoomWidth param is provided)
                offset: { vertical: 0, horizontal: 10 } //Zoomed image offset displayed offset the original hover
            };
            // The Zoomed Effects on Dynamic Images:
            product.images.map((image, id) => new ImageZoom(document.getElementById(`imageId${id + 1}`), options));
        }
    })

    // Display Product Details:
    useEffect(() => {
        getProductDetails(id)
            .then(data => {
                setProduct(data)
                setLoading(false);
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [id, productReviewed])

    // Function: Review Handler when Submitted
    const sendReviewHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        const formInputs = {
            comment: form.comment.value,
            rating: form.rating.value,
        }
        if (e.currentTarget.checkValidity() === true) {
            writeReviewApiRequest(product._id, formInputs)
                .then(data => {
                    if (data === "review created") {
                        setProductReviewed("You successfully reviewed the product!")
                    }
                })
                .catch((er) => setProductReviewed(er.response.data.message ? er.response.data.message : er.response.data))
        }
    }

    // Function: Scroll down to the Last comment after writing review
    useEffect(() => {
        if (productReviewed) {
            setTimeout(() => {
                messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
            }, 200)
        }
    }, [productReviewed])


    return (
        <>
            <MetaComponent title={product.name} description={product.description} />
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
                                {product.images ? product.images.map((image, id) => (
                                    <div key={id}>
                                        <div key={id} id={`imageId${id + 1}`}>
                                            <Image crossOrigin="anonymous" fluid src={`${image.path ?? null}`} />
                                        </div>
                                        <br />
                                    </div>
                                )) : null}

                            </Col>

                            <Col md={8}>
                                <Row>
                                    <Col md={8}>
                                        {/* Product name, Price, Description, and Rating Here */}
                                        <ListGroup variant="flush">
                                            <ListGroup.Item><h1>{product.name}</h1></ListGroup.Item>
                                            {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item> */}
                                            <ListGroup.Item>Rating:
                                                <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                                            </ListGroup.Item>
                                            <ListGroup.Item>Price <span className="fw-bold">${product.price}</span></ListGroup.Item>
                                            <ListGroup.Item> Product Description: {product.description}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col md={4}>
                                        {/* Product status, quantity/ Add to Cart */}
                                        <ListGroup>
                                            {/* Product Quantity */}
                                            <ListGroup.Item>
                                                <ListGroup.Item>Status: {product.count > 0 ? "in stock" : "out of stock"} </ListGroup.Item>
                                                <ListGroup.Item>Price: <span className="fw-bold">${product.price}</span> </ListGroup.Item>
                                                <ListGroup.Item> Quantity:
                                                    <Form.Select value={quantity} onChange={e => setQuantity(e.target.value)} size="lg" aria-label="Default select example">
                                                        {[...Array(product.count).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
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
                                            {product.reviews && product.reviews.map((review, idx) => (
                                                <ListGroup.Item key={idx}>
                                                    {review.user.name} <br />
                                                    <Rating readonly size={20} initialValue={review.rating} /> <br />
                                                    Date posted: {review.createdAt.substring(0, 10)} <br />
                                                    Product Review: {review.comment}
                                                </ListGroup.Item>
                                            ))}
                                            {/* Scroll All the way down to last comment */}
                                            <div ref={messagesEndRef} />
                                        </ListGroup>
                                    </Col>
                                </Row>
                                <hr />
                                {!userInfo.name && <Alert variant="danger">Login to Write a Review</Alert>}

                                {/* Review Form */}
                                <Form onSubmit={sendReviewHandler}>
                                    {/* Email Addresss */}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Write a Review Here</Form.Label>
                                        <Form.Control name="comment" required as="textarea" disabled={!userInfo.name} rows={3} />
                                    </Form.Group>
                                    {/* Submission */}
                                    <Form.Group>
                                        <Form.Select name="rating" required disabled={!userInfo.name} aria-label="Default select example">
                                            <option value="">Your Rating:</option>
                                            <option value="5">5 (Excellent)</option>
                                            <option value="4">4 (Very Good)</option>
                                            <option value="3">3 (Average)</option>
                                            <option value="2">2 (Bad)</option>
                                            <option value="1">1 (Terrible)</option>
                                        </Form.Select>
                                        <Button disabled={!userInfo.name} type="submit" className="mb-3 mt-3" variant="primary">Submit Review</Button>
                                        {productReviewed}
                                    </Form.Group>
                                </Form>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </>
    )
};

export default ProductDetailsPageComponent;