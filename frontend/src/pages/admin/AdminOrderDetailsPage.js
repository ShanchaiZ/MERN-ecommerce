import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// GET Details of User's Orders from the database:
const getOrder = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id);
    return data;
}


const AdminOrderDetailsPage = () => {
    return <OrderDetailsPageComponent getOrder={getOrder} />
};

export default AdminOrderDetailsPage;