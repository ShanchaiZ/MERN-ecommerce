import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";

const CartItemComponent = ({ item, orderCreated = false }) => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    {/* Image of Product */}
                    <Col md={2}>
                        <Image crossOrigin="anonymous" src={item.image ? (item.image.path ?? null) : null} fluid />
                    </Col>
                    {/* Name of Product */}
                    <Col md={2}>
                        {item.name}
                    </Col>
                    {/* Price of Product */}
                    <Col md={2}>
                        <b>{item.price}</b>
                    </Col>
                    {/* Quantity of product */}
                    <Col md={3}>
                        <Form.Select disabled={orderCreated} value={item.quantity}>
                            {[...Array(item.count).keys()].map(x => (
                                <option key={x + 1} value="x+1">{x + 1}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* Delete Item from Cart */}
                    <Col md={3}>
                        <Button type="button" variant="secondary" onClick={() => window.confirm("Are you sure?")}><i className="bi bi-trash"></i></Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <br />
        </>
    );
}

export default CartItemComponent;