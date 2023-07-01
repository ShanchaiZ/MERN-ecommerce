import EditUserPageComponent from "./components/EditUserPageComponent";

import axios from "axios";


// Get Method: Get User Data for Editing
const fetchUser = async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
}

//Put method: Admin Update User Data for Edit
const updateUserApiRequest = async (userId, name, lastName, email, isAdmin) => {
    const { data } = await axios.put(`/api/users/${userId}`, { name, lastName, email, isAdmin });
    return data;

}

const AdminEditUserPage = () => {

    return <EditUserPageComponent updateUserApiRequest={updateUserApiRequest} fetchUser={fetchUser} />
};

export default AdminEditUserPage;