import CartPageComponent from "./components/CartPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";


const CartPage = () => {

    //UseSelector used to target the variables found in redux global state for cart items:
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const reduxDispatch = useDispatch();


    return <CartPageComponent
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        reduxDispatch={reduxDispatch}
    />

};

export default CartPage;