import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const UserOrdersPageComponent = ({ getOrders }) => {
    
    // Initial Local State hooks:
    const [orders, setOrders] = useState([]);// Initiall Orders are empty array


    useEffect(() => {
        getOrders()
            .then(orders => setOrders(orders))
            .catch((er) => console.log(er));
    }, [])

    return (
        <Row className="m-5">
            <Col md={12}>
                <h1>My Orders</h1>
                {/* Bootstrap Tables */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* TABLE HEADERS */}
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>You</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.orderTotal.cartSubtotal}</td>
                                <td>
                                    {order.isDelivered ? <i className="bi bi-check-lg text"></i> : <i className="bi bi-x-lg text-danger"></i>}
                                </td>
                                <td>
                                    <Link to={`/user/order-details/${order._id}`}>Go to Order</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>
        </Row >
    )
};

export default UserOrdersPageComponent;