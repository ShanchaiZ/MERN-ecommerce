import ProductListPageComponent from "./components/ProductListPageComponent";

// Axios used to make API calls:
import axios from "axios";


// Get List of ALL Products:
const getProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
}


const ProductListPage = () => {

    return <ProductListPageComponent getProducts={getProducts} />
};

export default ProductListPage;