import { Card, Row, Col, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductForListComponent = ({ images, idx }) => {
    return (
        <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Row>
                {/* Media Query for large Screens = Image takes 5 columns */}         
                <Col lg={5}>
                    <Card.Img variant="top" src={"/images/category/" + images[idx] + "-category.jpg"} />
                </Col>
                {/* Media Query for large Screens = Image desc takes 7 columns so it appears to the right */}
                <Col lg={7}>
                    <Card.Body>
                        <Card.Title>Enter Product Name Here</Card.Title>
                        <Card.Text>
                            Product Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Card.Text>
                        <Card.Text>
                            <Rating readonly size={20} initialValue={5} /> (5)
                        </Card.Text>
                        <Card.Text className="h4">
                            $333 {" "}
                            <LinkContainer to="/product-details">
                                <Button variant="danger">View Product</Button>
                            </LinkContainer>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}


export default ProductForListComponent;