import EditUserPageComponent from "./components/EditUserPageComponent";

// Update User info:
const updateUserApiRequest = (name, lastName, email, isAdmin) => {
    console.log(name, lastName, email, isAdmin);
}

const AdminEditUserPage = () => {

    return <EditUserPageComponent updateUserApiRequest={updateUserApiRequest} />
};

export default AdminEditUserPage;