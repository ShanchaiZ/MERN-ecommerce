const imageValidate = (images) => {
    let imagesTable = [];
    if (Array.isArray(images)) {
        imagesTable = images;
    } else {
        imagesTable.push(images)
    }

    // Image Upload configuration:
    if (imagesTable.length > 3) {
        return { error: "Please upload maximum of 3 images!" }
    }
    for (let image of imagesTable) {
        // 1 MB = 1048576 bytes
        if (image.size > 1048576) return { error: "Image size too large (above 1 MB)" }
        
        // Allowed mimetype/file extensions for image upload:
        const filetypes = /jpg|jpeg|png/
        const mimetype = filetypes.test(image.mimetype);
        if (!mimetype) return { error: "Incorrect file extension (should be jpg, jpeg, or png)" }
    }

    return { error: false } //means there is no errors!
}


module.exports = imageValidate;