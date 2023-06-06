import UserProfilePageComponent from "./components/UserProfilePageComponent";

// Axios Used to make API Calls:
import axios from "axios";
// UseSelector allows extraction of data from Redux Store state using a selector function:
import { useSelector, useDispatch } from "react-redux";

import { setReduxUserState } from "../../redux/actions/userActions"

// Function for Updating User Profile using the fields listed below:
const updateUserApiRequest = async (name, lastName, phoneNumber, address, country, zipCode, city, state, password) => {
    const { data } = await axios.put("/api/users/profile", { name, lastName, phoneNumber, address, country, zipCode, city, state, password })
    return data;
};


// Fetching User Data for Easier Profile Update:
const fetchUser = async (id) => {
    const { data } = await axios.get("/api/users/profile/" + id);
    return data;
}


// Put Method used to Update User Profile:
const UserProfilePage = () => {

    const reduxDispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userRegisterLogin); //access the userInfo from Redux State

    return <UserProfilePageComponent
        updateUserApiRequest={updateUserApiRequest}
        fetchUser={fetchUser}
        userInfoFromRedux={userInfo}
        setReduxUserState={setReduxUserState}
        reduxDispatch={reduxDispatch}
        localStorage={window.localStorage}
        sessionStorage={window.sessionStorage}
    />
};

export default UserProfilePage;