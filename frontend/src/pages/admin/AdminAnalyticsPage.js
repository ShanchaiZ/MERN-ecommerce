import { Row, Col } from "react-bootstrap";

import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminAnalyticsPage = () => {
    return (

        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            
        </Row>

    )
};

export default AdminAnalyticsPage;