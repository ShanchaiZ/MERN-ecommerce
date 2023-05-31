import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//Redux Login Actions:
import { useDispatch } from "react-redux"; //Used to Call Redux Actions
import { logout } from "../../redux/actions/userActions";//Used call Logout Action

const AdminLinksComponent = () => {

    const dispatch = useDispatch();

    return (
        <Navbar bg="light" variant="light">
            <Nav className="flex-column">
                <LinkContainer to="/admin/orders">
                    <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                    <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                    <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/chats">
                    <Nav.Link>Chats</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/analytics">
                    <Nav.Link>Analytics</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default AdminLinksComponent;