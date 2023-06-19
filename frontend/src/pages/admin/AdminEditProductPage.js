import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";

import axios from "axios";

// Get Method: Fetch Products according to id:
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    return data;
}


const updateProductApiRequest = (productId, formInputs) => {
    console.log(productId);
    console.log(formInputs);
}


const AdminEditProductPage = () => {

    //Fetch Categories from Redux state for categories dropdown:
    const { categories } = useSelector((state) => state.getCategories);

    return <EditProductPageComponent categories={categories} fetchProduct={fetchProduct} updateProductApiRequest={updateProductApiRequest} />
};

export default AdminEditProductPage;