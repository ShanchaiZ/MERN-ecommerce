import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";

import { useSelector } from "react-redux";

const UserOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    return <UserOrderDetailsPageComponent userInfo={userInfo} />
};

export default UserOrderDetailsPage;