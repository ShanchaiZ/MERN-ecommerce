import RegisterPageComponent from "./components/RegisterPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// Redux Actions:
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions"; //User will successfully register AND login at the same time 

// Post: Register/Create a new User using user property
const registerUserApiRequest = async (name, lastName, email, password) => {
    const { data } = await axios.post("/api/users/register", { name, lastName, email, password });
    return data;
}


const RegisterPage = () => {
    const reduxDispatch = useDispatch();
    return <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />
};

export default RegisterPage;