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

const HeaderComponent = () => {
    return (
        // NavBar from Bootstrap Docs
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/home">
                    <Navbar.Brand href="#home">Shoptimize</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* 1st part NavBar SearchBar with Product Categories */}
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
                    {/* 2nd part NavBar Cart Pricing */}
                    <Nav>
                        <LinkContainer to="/admin/orders">
                            <Nav.Link>
                                Admin
                                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                            </Nav.Link>
                        </LinkContainer>

                        <Nav.Link href="#pricing">
                            {/* Pill Badge Notification */}
                            <Badge pill bg="danger">3</Badge>
                            Cart
                        </Nav.Link>
                        <NavDropdown title="JohnDoe" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
                            <NavDropdown.Item>Logout</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;