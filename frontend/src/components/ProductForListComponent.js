import { Card, Row, Col, Button } from "react-bootstrap";
import { RatingView } from "react-simple-star-rating";

const ProductForListComponent = () => {
    return (
        <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Row>
                {/* Media Query for large Screens = Image takes 5 columns */}
                <Col lg={5}>
                    <Card.Img variant="top" src="/images/category/computers-category.jpg" />
                </Col>
                {/* Media Query for large Screens = Image desc takes 7 columns so it appears to the right */}
                <Col lg={7}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}


export default ProductForListComponent;