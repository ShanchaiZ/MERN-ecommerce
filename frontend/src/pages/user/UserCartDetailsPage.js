import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import axios from "axios";

const UserCartDetailsPage = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const itemsCount = useSelector((state) => state.cart.itemsCount);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const reduxDispatch = useDispatch();


    // Get User Info In the Cart Details page:
    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    }


    return <UserCartDetailsPageComponent
        cartItems={cartItems}
        itemsCount={itemsCount}
        cartSubtotal={cartSubtotal}
        reduxDispatch={reduxDispatch}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        userInfo={userInfo}
        getUser={getUser}
    />
};

export default UserCartDetailsPage;