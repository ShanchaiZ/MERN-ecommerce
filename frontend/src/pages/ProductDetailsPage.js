import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

// import { useEffect } from "react";

// Redux:
import { useDispatch } from "react-redux"; // Calling Actions done by Dispatch
import { addToCart } from "../redux/actions/cartActions"; //Calling the Action of adding to cart 

import axios from "axios";


// Get Method: Get product details from database
const getProductDetails = async (id) => {
    const { data } = await axios.get(`/api/products/get-one/${id}`);
    return data;
}

const ProductDetailsPage = () => {
    const dispatch = useDispatch();


    return <ProductDetailsPageComponent reduxDispatch={dispatch} addToCartReduxAction={addToCart} getProductDetails={getProductDetails} />
};

export default ProductDetailsPage;