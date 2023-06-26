import CreateProductPageComponent from "./components/CreateProductPageComponent";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./utils/utils";

import axios from "axios";

// Create a new Product using Form Fields:
const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
}

const AdminCreateProductPage = () => {

    return <CreateProductPageComponent
        createProductApiRequest={createProductApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest} />
};

export default AdminCreateProductPage;