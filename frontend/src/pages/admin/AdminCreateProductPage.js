import CreateProductPageComponent from "./components/CreateProductPageComponent";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./utils/utils";

import axios from "axios";

import { useSelector } from "react-redux";
import { newCategory, deleteCategory, saveAttributeToCatDoc } from "../../redux/actions/categoriesAction";
import { useDispatch } from "react-redux";


// Create a new Product using Form Fields:
const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
}

const AdminCreateProductPage = () => {
    const { categories } = useSelector((state) => state.getCategories);
    const dispatch = useDispatch();

    return <CreateProductPageComponent
        createProductApiRequest={createProductApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
        categories={categories}
        reduxDispatch={dispatch}
        newCategory={newCategory}
        deleteCategory={deleteCategory}
        saveAttributeToCatDoc={saveAttributeToCatDoc}
    />
};

export default AdminCreateProductPage;