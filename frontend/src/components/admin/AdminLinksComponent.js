import { Nav } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap";

const AdminLinksComponent = () => {
    return (
        <LinkContainer to="/admin/orders">
            <Nav className="flex-column">
                <Nav.Link>Orders</Nav.Link>
            </Nav>
        </LinkContainer>
    )
}

export default AdminLinksComponent;