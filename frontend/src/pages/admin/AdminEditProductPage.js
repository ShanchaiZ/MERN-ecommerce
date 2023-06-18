import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";

import axios from "axios";

// Get Method: Fetch Products according to id:
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    return data;
}


const AdminEditProductPage = () => {

    //Fetch Categories from Redux state for categories dropdown:
    const { categories } = useSelector((state) => state.getCategories);

    return <EditProductPageComponent categories={categories} fetchProduct={fetchProduct} />
};

export default AdminEditProductPage;