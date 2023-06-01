import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Badge,
    Form,
    Dropdown,
    DropdownButton,
    Button,
    InputGroup
}
    from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap"; //Used to link containers to different routes
import { Link } from "react-router-dom"; //Link as a JS object

// Redux Logout:
import { useDispatch, useSelector } from "react-redux"; //Used to call Redux actions
import { logout } from "../redux/actions/userActions"; //Used to call defined logout actions:

const HeaderComponent = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userRegisterLogin);
    
    return (
        // NavBar from Bootstrap Docs
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/home">
                    <Navbar.Brand href="#home">Shoptimize</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* 1st part NavBar: SearchBar with Product Categories */}
                    <Nav className="me-auto">
                        <InputGroup>
                            {/* DropDown Button for Product Categories */}
                            <DropdownButton id="dropdown-basic-button" title="All">
                                <Dropdown.Item>Electronics</Dropdown.Item>
                                <Dropdown.Item>Cars</Dropdown.Item>
                                <Dropdown.Item>Books</Dropdown.Item>
                            </DropdownButton>
                            {/* Search Bar for Product */}
                            <Form.Control type="text" placeholder="Search Products Here ..." />
                            {/* Search Button */}
                            <Button variant="warning">
                                <i className="bi bi-search text-dark"></i>
                            </Button>
                        </InputGroup>
                    </Nav>

                    {/* 2nd part NavBar: Admin, User Login/Registration and Cart */}
                    <Nav>
                        <LinkContainer to="/admin/orders">
                            <Nav.Link>
                                Admin
                                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                            </Nav.Link>
                        </LinkContainer>
                        {/* User Dropdown Options */}
                        <NavDropdown title="JohnDoe" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                        </NavDropdown>

                        {/* Link to Login */}
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>

                        {/* Link to Registration */}
                        <LinkContainer to="/register">
                            <Nav.Link>Register</Nav.Link>
                        </LinkContainer>

                        {/* Link to Cart */}
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                {/* Pill Badge Notification */}
                                <Badge pill bg="danger">3</Badge>
                                <i className="bi bi-cart4"></i>
                                <span className="ms-1">Cart</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;