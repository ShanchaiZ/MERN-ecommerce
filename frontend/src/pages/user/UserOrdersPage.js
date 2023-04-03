import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const UserOrdersPage = () => {
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
                        {/* TABLE BODY CONTENT */}
                        <tr>
                            <td>1</td>
                            <td>Olive Branch</td>
                            <td>01-10-2023</td>
                            <td>$567</td>
                            <td>
                                <i className="bi bi-check-lg text-success"></i>
                            </td>
                            <td>
                                <Link to="/user/order-details">Go to Order</Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>


            </Col>
        </Row>
    )
};

export default UserOrdersPage;