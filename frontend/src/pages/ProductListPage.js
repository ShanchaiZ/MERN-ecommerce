import ProductListPageComponent from "./components/ProductListPageComponent";

// Axios used to make API calls:
import axios from "axios";

import { useSelector } from "react-redux";

let filtersUrl = "";

// Get List of ALL Products in database + update along with pagination and pageNumber Display:
const getProducts = async (categoryName = "", pageNumParam = null, searchQuery = "", filters = {}, sortOption = "") => {
    filtersUrl = "";
    console.log(filters);
    const search = searchQuery ? `search/${searchQuery}` : "";
    const category = categoryName ? `category/${categoryName}/` : "";
    const url = `/api/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`
    const { data } = await axios.get(url);
    return data;
}


const ProductListPage = () => {

    const { categories } = useSelector((state) => state.getCategories);

    return <ProductListPageComponent getProducts={getProducts} categories={categories} />
};

export default ProductListPage;