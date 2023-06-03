import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

// import { useEffect } from "react";

// Redux:
import { useDispatch } from "react-redux"; // Calling Actions done by Dispatch
import { addToCart } from "../redux/actions/cartActions"; //Caling the Action of adding to cart 

const ProductDetailsPage = () => {
    const dispatch = useDispatch();


    return <ProductDetailsPageComponent reduxDispatch={dispatch} addToCartReduxAction={addToCart} />
};

export default ProductDetailsPage;