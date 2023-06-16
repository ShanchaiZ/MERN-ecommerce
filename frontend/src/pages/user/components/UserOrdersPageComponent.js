import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const UserOrdersPageComponent = ({ getOrders }) => {
    getOrders().then(orders => console.log(orders));
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
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Lois Price</td>
                                <td>01-10-2023</td>
                                <td>$567</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>
                                    <Link to="/user/order-details">Go to Order</Link>
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