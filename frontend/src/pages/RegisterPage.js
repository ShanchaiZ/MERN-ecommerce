import RegisterPageComponent from "./components/RegisterPageComponent";

import axios from "axios";


// Post: Register/Create a new User using user property
const registerUserApiRequest = async (name, lastName, email, password) => {
    const {data} = await axios.post("/api/users/register", {name, lastName, email, password});
    return data;
}


const RegisterPage = () => {

    return <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} />
};

export default RegisterPage;