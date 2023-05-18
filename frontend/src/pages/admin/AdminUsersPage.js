import UsersPageComponent from "./components/UsersPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// GET request: Fetch Users from Database:
const fetchUsers = async (abctrl) => {
    const { data } = await axios.get("/api/users", { signal: abctrl.signal });
    return data;
}

// DELETE request: Delete A User from Database:
const deleteUser = async (userId) => {
    const { data } = await axios.delete(`/api/users/${userId}`)
    return data;
}

const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />
};

export default AdminUsersPage;