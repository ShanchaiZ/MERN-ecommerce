import ProductsPageComponent from "./components/ProductsPageComponent";

// Axios used to make API Calls:
import axios from "axios";

// Get Products from database:
const fetchProducts = async (abctrl) => {
    const { data } = await axios.get("/api/products/admin", { signal: abctrl.signal });
    return data;
}

// Delete Product from database:
const deleteProduct = async (productId) => {
    const { data } = await axios.delete(`/api/products/admin/${productId}`);
    return data;

}

const AdminProductsPage = () => {
    return <ProductsPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct} />
};

export default AdminProductsPage;