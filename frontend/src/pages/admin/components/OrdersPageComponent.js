import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

// React useState/useEffect Hooks:
import { useState, useEffect } from "react";

const OrdersPageComponent = ({ getOrders }) => {

    // Initial State of the React Hooks
    const [orders, setOrders] = useState([]); // Initially set to empty array of products

    
    //React UseEffect after browser load:
    useEffect(() => {
        getOrders()
            .then((orders) => setOrders(orders))
            .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [])
    console.log(orders);

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
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Lois Price</td>
                                <td>01-10-2023</td>
                                <td>$567</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>PayPal</td>
                                <td>
                                    <Link to="/admin/order-details">Go to Order</Link>
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