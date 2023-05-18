import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";


// React useState/useEffect Hooks:
import { useState, useEffect } from "react";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {

    // Initial State of the React Hooks
    const [users, setUsers] = useState([]); // Initially set to empty array of users
    const [userDeleted, setUserDeleted] = useState(false); //Initially set to false because no one getting deleted.

    const deleteHandler = async (userId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteUser(userId);
            if (data === "User removed") {
                setUserDeleted(!userDeleted);
            }
        }
    }

    //React UseEffect after browser load:
    useEffect(() => {
        const abctrl = new AbortController();
        fetchUsers(abctrl)
            .then(res => setUsers(res))
            .catch(error => console.log({ error: error.message }));
        // .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
        return () => abctrl.abort();
    }, [userDeleted]);

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            <Col md={10}>
                <h1>User List </h1>
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
                        {users.map((user, idx) => (
                            < tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/edit-users/${user._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
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