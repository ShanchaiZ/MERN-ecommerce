import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

// import { useEffect } from "react";

// Redux:
import { useDispatch, useSelector } from "react-redux"; // Calling Actions done by Dispatch
import { addToCart } from "../redux/actions/cartActions"; //Caling the Action of adding to cart 

const ProductDetailsPage = () => {
    const products = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart());
    }

    return <ProductDetailsPageComponent addToCartHandler={addToCartHandler} products={products}  />
};

export default ProductDetailsPage;