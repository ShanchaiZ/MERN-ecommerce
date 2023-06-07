import { ListGroup, Row, Col, Image, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, removeFromCartHandler = false, orderCreated = false, changeCount = false }) => {
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
                        <Form.Select onChange={changeCount ? (e) => changeCount(item.productID, e.target.value) : undefined} disabled={orderCreated} value={item.quantity}>
                            {[...Array(item.count).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* Delete Item from Cart */}
                    <Col md={3}>
                        <RemoveFromCartComponent
                            orderCreated={orderCreated}
                            productID={item.productID}
                            quantity={item.quantity}
                            price={item.price}
                            removeFromCartHandler={removeFromCartHandler ? removeFromCartHandler : undefined}
                        />
                    </Col>
                </Row>
            </ListGroup.Item>
            <br />
        </>
    );
}

export default CartItemComponent;