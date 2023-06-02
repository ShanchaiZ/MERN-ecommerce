import UserProfilePageComponent from "./components/UserProfilePageComponent";

// Axios Used to make API Calls:
import axios from "axios";


// Put Method used to Update User Profile:
const UserProfilePage = () => {

    const updateUserApiRequest = async (name, lastName, phoneNumber, address, country, zipCode, city, state, password) => {
        const { data } = await axios.put("/api/users/profile", { name, lastName, phoneNumber, address, country, zipCode, city, state, password })
        return data;
    }

    return <UserProfilePageComponent updateUserApiRequest={updateUserApiRequest} />
};

export default UserProfilePage;