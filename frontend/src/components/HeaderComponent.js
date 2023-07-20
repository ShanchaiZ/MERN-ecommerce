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
import { Link, useNavigate } from "react-router-dom"; //Link as a JS object

// Redux Logout:
import { useDispatch, useSelector } from "react-redux"; //Used to call Redux actions
import { logout } from "../redux/actions/userActions"; //Used to call defined logout actions:

import { useEffect, useState } from "react";
import { getCategories } from "../redux/actions/categoriesAction";

import socketIOClient from "socket.io-client";
import { setChatRooms, setSocket, setMessageReceived } from "../redux/actions/chatActions";


const HeaderComponent = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userRegisterLogin);

    const itemsCount = useSelector((state) => state.cart.itemsCount);

    const { categories } = useSelector((state) => state.getCategories);
    const { messageReceived } = useSelector((state) => state.adminChat);

    const [searchCategoryToggle, setSearchCategoryToggle] = useState("All"); //Initially set to "All" in the blue category dropdown
    const [searchQuery, setSearchQuery] = useState(""); //Initially the search bar query is empty string for user to write their search 

    const navigate = useNavigate();


    // Fetching all Categories for the header dropdown:
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    // Function: submit search request on header search bar by pressing button/ "Enter"
    const submitHandler = (e) => {
        if (e.keyCode && e.keyCode !== 13) return;
        e.preventDefault();
        if (searchQuery.trim()) {
            // If Searching by No filtering and no user Search Query:
            if (searchCategoryToggle === "All") {
                navigate(`/product-list/search/${searchQuery}`);
            } else {
                // If Searching DropDown Category + User Search Query with subcateory:
                navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}/search/${searchQuery}`);
            }
        }
        // If Searching DropDown Category:
        else if (searchCategoryToggle !== "All") {
            navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`);
        } else {
            // Otherwise, Show all products:
            navigate("/product-list");
        }
    }

    // Socket Io chat for admin initialized:
    useEffect(() => {
        if (userInfo.isAdmin) {
            var audio = new Audio("/audio/chat-msg.mp3");
            const socket = socketIOClient();
            socket.on("server sends message from client to admin", ({ message }) => {
                dispatch(setSocket(socket));
                dispatch(setChatRooms("exampleUser", message));
                dispatch(setMessageReceived(true));
                audio.play();
            })
            return () => socket.disconnect();
        }
    }, [userInfo.isAdmin])

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
                            <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
                                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>All</Dropdown.Item>
                                {categories.map((category, id) => (
                                    <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>{category.name}</Dropdown.Item>
                                ))}

                            </DropdownButton>
                            {/* Search Bar for Product */}
                            <Form.Control onKeyUp={submitHandler} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search Products Here ..." />
                            {/* Search Button */}
                            <Button onClick={submitHandler} variant="warning">
                                <i className="bi bi-search text-dark"></i>
                            </Button>
                        </InputGroup>
                    </Nav>

                    {/* 2nd part NavBar: Admin, User Login/Registration and Cart */}
                    <Nav>
                        {/* If User is an Admin, Show /admin links in header:... */}
                        {userInfo.isAdmin ? (
                            <LinkContainer to="/admin/orders">
                                <Nav.Link>
                                    Admin
                                    {messageReceived && <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}
                                </Nav.Link>
                            </LinkContainer>

                            //... Otherwise, show name of regular user and links in header...:
                        ) : userInfo.name && !userInfo.isAdmin ? (

                            // User Dropdown Options:
                            < NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
                                <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            // ... Otherwise, redirect header to login and register links.
                            <>
                                {/* Link to Login */}
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>

                                {/* Link to Registration */}
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}

                        {/* Link to Cart */}
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                {/* Pill Badge Notification */}
                                <Badge pill bg="danger">
                                    {itemsCount === 0 ? "" : itemsCount}
                                </Badge>
                                <i className="bi bi-cart4"></i>
                                <span className="ms-1">Cart</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default HeaderComponent;