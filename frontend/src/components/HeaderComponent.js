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
                            <Form.Control type="text" placeholder="Normal text" />
                            {/* Search Button */}
                            <Button variant="warning">Warning</Button>
                        </InputGroup>
                    </Nav>
                    {/* 2nd part NavBar Cart Pricing */}
                    <Nav>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#pricing">
                            {/* Pill Badge Notification */}
                            <Badge pill bg="danger">3</Badge>
                            Cart
                        </Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;