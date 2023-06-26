import axios from "axios";

// Create a new Product that appends images to the newly created product:
export const uploadImagesApiRequest = async (images, productId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
        formData.append("images", image);
    })
    const { data } = await axios.post("/api/products/admin/upload?productId=" + productId, formData);
    return data;
};


// Function: Upload images to the Cloud using Cloudinary Docs:
export const uploadImagesCloudinaryApiRequest = (images, productId) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                axios.post("/api/products/admin/upload?cloudinary=true&productId=" + productId, data);
            })
    }
};