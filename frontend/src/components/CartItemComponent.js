import { ListGroup, Row, Col, Image } from "react-bootstrap";


const CartItemComponent = () => {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={2}>
                    <Image src="/images/category/tablets-category.jpg" fluid />
                </Col>
                <Col md={2}>

                </Col>
                <Col md={2}>

                </Col>
                <Col md={3}>

                </Col>
                <Col md={3}>

                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default CartItemComponent;