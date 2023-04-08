import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";


const AdminProductsPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            <Col md={10}>
                <h1>
                    Product List {" "}
                    <LinkContainer to="/admin/create-new-product">
                        <Button variant="primary">Create New</Button>
                    </LinkContainer>
                </h1>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>
        </Row >
    )
};

export default AdminProductsPage;