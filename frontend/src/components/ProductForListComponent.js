import { Card, Row, Col, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

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
                        <Card.Title>Enter Product Name Here</Card.Title>
                        <Card.Text>
                            Product Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Card.Text>
                        <Card.Text>
                            <Rating readonly size={20} initialValue={5} /> (5)
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}


export default ProductForListComponent;