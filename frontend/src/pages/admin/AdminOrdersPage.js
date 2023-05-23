import OrdersPageComponent from "./components/OrdersPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// Get Orders from Database:
const getOrders = async () => {
    const { data } = await axios.get("/api/orders/admin")
    return data;
}

const AdminOrdersPage = () => {
    return <OrdersPageComponent getOrders={getOrders} />
};

export default AdminOrdersPage;