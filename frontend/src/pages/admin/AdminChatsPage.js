import { Row, Col } from "react-bootstrap";

import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";

const AdminChatsPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <Row>
                    <AdminChatRoomComponent />
                </Row>
            </Col>
        </Row>
    )
};

export default AdminChatsPage;