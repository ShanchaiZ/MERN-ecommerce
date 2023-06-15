import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";

import { useSelector } from "react-redux";

import axios from "axios";

// Imported PayPal as payment method:
import { loadScript } from "@paypal/paypal-js";


// Get Order from Database and dynamically show on this page:
const getOrder = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
}


// PayPal Buttons Rendering when Paypal payment selected:
const loadPayPalScript = () => {
    loadScript({
        "client-id": "AQHnpVz64-l3AuEusvofl0Wpkc2u_sLVsGxAisEkTQAueVQR9F0q9sUlWqyLv8qb6uZ6NNY3K0hj7LIm"
    })
        .then(paypal => {
            paypal
                .Buttons({
                    createOrder: createPayPalOrderHandler,
                    onCancel: onCancelHandler,
                    onApprove: onApproveHandler,
                    onError: onErrorHandler
                })
                .render("#paypal-container-element");
        })
        .catch(err => {
            console.error("failed to load PayPal js SDK script", err);
        });
}

// Paypal Methods: CreateOrder Handler
const createPayPalOrderHandler = function () {
    console.log("createPayPalOrderHandler");
}

// Paypal Methods: Cancel Order Handler
const onCancelHandler = function () {
    console.log("Cancel Order Payment");
}

// Paypal Methods: Order Approved Handler
const onApproveHandler = function () {
    console.log("Order Through Purchase Approved!");
}

// Paypal Methods: Payment Error Handler:
const onErrorHandler = function (err) {
    console.log("Paypal error");
}


const UserOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    }


    return <UserOrderDetailsPageComponent userInfo={userInfo} getUser={getUser} getOrder={getOrder} loadPayPalScript={loadPayPalScript} />
};

export default UserOrderDetailsPage;