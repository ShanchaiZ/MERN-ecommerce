import UserOrdersPageComponent from "./components/UserOrdersPageComponent";

import axios from "axios";


// GET Method: Get all User Orders from database
const getOrders = async () => {
    const { data } = await axios.get("/api/orders");
    return data;
}

const UserOrdersPage = () => {
    return <UserOrdersPageComponent getOrders={getOrders} />
};

export default UserOrdersPage;