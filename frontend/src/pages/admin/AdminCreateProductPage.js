import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminCreateProductPage = () => {
    return (
        <Container className="justified-content-md-content mt-5">
            <Row>
                {/* Go Back to Admin Products button */}
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">Go Back </Link>
                </Col>
                
                {/* Create a New Product */}
                <Col md={6}>
                    <h1>Create a New Product</h1>
                </Col>
            </Row>
        </Container>
    )
};

export default AdminCreateProductPage;