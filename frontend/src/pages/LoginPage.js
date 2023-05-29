import LoginPageComponent from "./components/LoginPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// Action: is called using 'dispatch' keyword:
import { useDispatch } from "react-redux"; //for calling all actions 
import { setReduxUserState } from "../redux/actions/userActions"; // the actual action for Saving User info as a Redux Global State


const loginUserApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", { email, password, doNotLogout })
    return data;

};


const LoginPage = () => {
    const reduxDispatch = useDispatch();
    return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />
};

export default LoginPage;