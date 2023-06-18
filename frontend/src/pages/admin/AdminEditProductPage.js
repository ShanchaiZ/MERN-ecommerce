import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";

const AdminEditProductPage = () => {

    //Fetch Categories from Redux state for categories dropdown:
    const { categories } = useSelector((state) => state.getCategories);

    return <EditProductPageComponent categories={categories} />
};

export default AdminEditProductPage;