import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";


// Testing out React useState/useEffect Hooks:
import { useState, useEffect } from "react";

const UsersPageComponent = ({ fetchUsers }) => {

    // ==========================Testing out React UseState Hooks:=============================
    const [users, setUsers] = useState([]);

    const deleteHandler = () => {
        if (window.confirm("Are you sure?")) {
            alert("User Deleted!");
        }
    }

    useEffect(() => {
        const abctrl = new AbortController();
        fetchUsers(abctrl).then(res => setUsers(res));
        return () => abctrl.abort();
    }, []);

    // ==========================Testing out REACT useState Effect =============================
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            <Col md={10}>
                <h1>User List </h1>
                {console.log(users)}
                {/* Bootstrap Tables */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* TABLE HEADERS */}
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Is Admin?</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Lois</td>
                                <td>Price</td>
                                <td>$Lois@Price.com</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>
                                    <LinkContainer to="/admin/edit-users">
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>
        </Row >
    );
};

export default UsersPageComponent;