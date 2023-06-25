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
    Array.from(images).forEach((image) => {
        formData.append("images", image);
    })
    await axios.post("/api/products/admin/upload?productId=" + productId, formData);
}


// Function: Upload images to the Cloud using Cloudinary Docs:
const uploadImagesCloudinaryApiRequest = (images) => {
    const url = "https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload"
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", "<EnterUploadPresetNameHere>");
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
    }
}


const AdminCreateProductPage = () => {

    return <CreateProductPageComponent
        createProductApiRequest={createProductApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest} />
};

export default AdminCreateProductPage;