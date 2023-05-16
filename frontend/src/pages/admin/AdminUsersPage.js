import UsersPageComponent from "./components/UsersPageComponent";

import axios from "axios";

// GET request: Fetch Users from Database:
const fetchUsers = async () => {
    const { data } = await axios.get("/api/users");
    return data;
}

fetchUsers();


const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} />
};

export default AdminUsersPage;