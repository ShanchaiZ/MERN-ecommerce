import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

// React useState/useEffect Hooks:
import { useState, useEffect } from "react";

// // Used to Logout on Error:
// import { useDispatch } from "react-redux"; //Used to Call Redux Actions
// import { logout } from "../../../redux/actions/userActions"; //Used call Logout Action

const OrdersPageComponent = ({ getOrders }) => {

    // Initial State of the React Hooks
    const [orders, setOrders] = useState([]); // Initially set to empty array of products
    // const dispatch = useDispatch();

    //React UseEffect after browser load:
    useEffect(() => {
        getOrders()
            .then((orders) => setOrders(orders))
            .catch((er) =>
                // dispatch(logout()) // to do: Logout on Error. fix the error
                console.log(er.response.data.message ? er.response.data.message : er.response.data)
            );
    }, [getOrders])

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            <Col md={10}>
                <h1>My Orders</h1>
                {/* Bootstrap Tables */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* TABLE HEADERS */}
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Payment Method</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    {order.user !== null ? (
                                        <>
                                            {order.user.name} {order.user.lastName}
                                        </>
                                    ) : null}
                                </td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.orderTotal.cartSubtotal}</td>
                                <td>
                                    {order.isDelivered ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                                </td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <Link to={`/admin/order-details/${order._id}`}>Go to Order</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>
        </Row >
    )
};

export default OrdersPageComponent;