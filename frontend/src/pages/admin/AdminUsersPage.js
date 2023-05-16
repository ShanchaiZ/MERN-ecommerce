import UsersPageComponent from "./components/UsersPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// GET request: Fetch Users from Database:
const fetchUsers = async (abctrl) => {
    const { data } = await axios.get("/api/users", { signal: abctrl.signal });
    return data;
}

const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} />
};

export default AdminUsersPage;