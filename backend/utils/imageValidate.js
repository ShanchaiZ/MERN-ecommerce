const imageValidate = (images) => {
    let imagesTable = [];
    if (Array.isArray(images)) {
        imagesTable = images;
    } else {
        imagesTable.push(images)
    }

    if (imagesTable.length > 3) {
        return { error: "Please upload maximum of 3 images!" }
    }
}