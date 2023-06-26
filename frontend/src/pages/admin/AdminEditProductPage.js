import EditProductPageComponent from "./components/EditProductPageComponent";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./utils/utils";

import { useSelector } from "react-redux";

import axios from "axios";

// Redux for Saving Attribute to Category:
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoriesAction";

// Get Method: Fetch Products according to id:
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    return data;
}

// Put method: Update Product fields in the edit form
const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(`/api/products/admin/${productId}`, { ...formInputs });
    return data;
}

const AdminEditProductPage = () => {

    //Fetch Categories from Redux state for categories dropdown:
    const { categories } = useSelector((state) => state.getCategories);

    const reduxDispatch = useDispatch();

    //Function: Image Delete Handler:
    const imageDeleteHandler = async (imagePath, productId) => {
        let encoded = encodeURIComponent(imagePath);
        if (process.env.NODE_ENV !== "production") {
            // to do: change to !== production
            await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
        } else {
            await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`);
        }
    }


    return <EditProductPageComponent
        categories={categories}
        fetchProduct={fetchProduct}
        updateProductApiRequest={updateProductApiRequest}
        reduxDispatch={reduxDispatch}
        saveAttributeToCatDoc={saveAttributeToCatDoc}
        imageDeleteHandler={imageDeleteHandler}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
};

export default AdminEditProductPage;