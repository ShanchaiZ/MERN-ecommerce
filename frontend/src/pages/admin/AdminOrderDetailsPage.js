import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// GET Details of User's Orders from the database:
const getOrder = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id);
    return data;
}


// Update the order from "Marked as delivered" to Order completed when button pressed:
const markAsDelivered = async (id) => {
    const { data } = await axios.put("/api/orders/delivered/" + id);
    if (data) {
        return data;
    }
}

const AdminOrderDetailsPage = () => {
    return <OrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} />
};

export default AdminOrderDetailsPage;