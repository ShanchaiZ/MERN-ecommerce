import CreateProductPageComponent from "./components/CreateProductPageComponent";

import axios from "axios";

// Create a new Product using Form Fields:
const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
}

// Create a new Product that appends images to the newly created product:
const uploadImagesApiRequest = async (images, productId) => {
    const formData = new FormData();
    Array.form(images).forEach(image => {
        formData.append("images", image);
    })
    await axios.post("/api/products/admin/upload?productId=" + productId, formData);
}


const AdminCreateProductPage = () => {

    return <CreateProductPageComponent
        createProductApiRequest={createProductApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest} />
};

export default AdminCreateProductPage;