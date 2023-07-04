import ProductListPageComponent from "./components/ProductListPageComponent";

// Axios used to make API calls:
import axios from "axios";


import { useSelector } from "react-redux";


// Get List of ALL Products:
const getProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
}


const ProductListPage = () => {

    const { categories } = useSelector((state) => state.getCategories);

    return <ProductListPageComponent getProducts={getProducts} categories={categories} />
};

export default ProductListPage;