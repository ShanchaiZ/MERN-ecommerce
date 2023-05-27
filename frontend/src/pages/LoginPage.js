import LoginPageComponent from "./components/LoginPageComponent";

// Axios used to make API Calls:
import axios from "axios";

const loginUserApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", { email, password, doNotLogout })
    return data;

};


const LoginPage = () => {
    
    return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} />
};

export default LoginPage;