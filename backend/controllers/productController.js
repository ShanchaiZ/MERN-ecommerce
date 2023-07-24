const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");


const getProducts = async (req, res, next) => {
    try {

        // Variable used to for Filtering Products:
        let query = {};
        let queryCondition = false;

        // Filtering for Price:
        let priceQueryCondition = {};
        if (req.query.price) {
            queryCondition = true;
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        // Filtering for Rating:
        let RatingQueryCondition = {};
        if (req.query.rating) {
            queryCondition = true;
            RatingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        // Logic used to Get Product from Specific Category using Search Bar:
        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || "";
        if (categoryName) {
            queryCondition = true;
            let a = categoryName.replace(/, /g, "/");
            var regEx = new RegExp("^" + a); // this expression created forward slashes with regExp in the slash => /^a/ and carrot sign => begining of string
            categoryQueryCondition = { category: regEx }
        }

        // Logic used to Get Product from Specific Category using the filtering feature on page:
        if (req.query.category) {
            queryCondition = true;
            let a = req.query.category.split(",").map((item) => {
                if (item) return regEx = new RegExp("^" + item);
            })
            categoryQueryCondition = {
                category: { $in: a }
            }
        }


        // Logic used to Get Product by Filtering Through Attribute on page:
        let attrsQueryCondition = [];
        if (req.query.attrs) {
            // In attrs array, RAM = key and 1TB = value. RAM-1TB-2TB-3TB, color-blue-red
            // [RAM-1TB-2TB-3TB, color-blue-red]
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-"); //OUTPUT: 2 attributes arrays of key and values of [ 'RAM', '1TB', '2TB', '3TB' ] and [ ' color', 'blue', 'red' ]
                    let values = [...a];// Same output of 2 attributes arrays of key and values of [ 'RAM', '1TB', '2TB', '3TB' ] and [ ' color', 'blue', 'red' ]
                    values.shift(); // removes first item in each array. left with ['1TB', '2TB', '3TB' ] and [ 'blue', 'red' ]
                    let a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values } } } //makes it so we only want products that only have those attributes
                    }
                    acc.push(a1); //initially the accumulator 'acc' is empty => .push a1 onto it and need to return for .reduce to work
                    // console.dir(acc, { depth: null });
                    return acc;
                } else return acc;
            }, []);
            // console.dir(attrsQueryCondition, { depth: null });
            queryCondition = true;
        }


        // Variable used for Pagination and Sorting Products:
        const pageNum = Number(req.query.pageNum) || 1; //number inputted by user or by default set to 1.


        // Dynamic Sorting of Product by other fields instead of static ascending order:
        let sort = {};
        const sortOption = req.query.sort || "";
        if (sortOption) {
            let sortOpt = sortOption.split("_");
            sort = { [sortOpt[0]]: Number(sortOpt[1]) };
            console.log(sort);
        }

        // Logic used Get Products by Searching in Search Bar:
        const searchQuery = req.params.searchQuery || "";
        let searchQueryCondition = {};
        let select = {};
        if (searchQuery) {
            queryCondition = true;
            searchQueryCondition = { $text: { $search: searchQuery } }
            select = {
                score: { $meta: "textScore" } // this represents the accuracy of search results!
            }
            sort = { score: { $meta: "textScore" } } // this allows sorting in descending order through search result accuracy
        }

        // If there is a Query to filter requests:..
        if (queryCondition) {
            //... then Combining the Price AND rating Operator:
            query = {
                $and: [priceQueryCondition, RatingQueryCondition, categoryQueryCondition, searchQueryCondition, ...attrsQueryCondition]
            }
        }


        // Main Database Queries for finding products:
        const totalProducts = await Product.countDocuments(query); //provides a total count of all products in a database.
        const products = await Product.find(query) //finds all products in the db hence the empty {}
            .sort(sort)//instead of static "asc" string to sort in name in ascending order, 1 also works(Note: -1 = descending order). 
            .limit(recordsPerPage) //limits the amount of product results that can be displayed; used for pagination
            .skip(recordsPerPage * (pageNum - 1)) //skips over the number of records in the argument and displays results after the skipped number indicated by recordsPerPage
            .select(select)//select is used to exclude fields from results.

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) // Take the upper limit of number of all the products in a database and divide by the recordsPerPage number which results in number of product links that can be displayed on a page.
        });
    } catch (error) {
        next(error)
    }
};


// Get Product AND its associated Reviews by ID:
const getProductbyId = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews").orFail();
        res.json(product);
    } catch (error) {
        next(error)
    }
}

// Get Bestsellers Product:
const getBestsellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ])
        res.json(products);
    } catch (error) {
        next(error)
    }
}


// Admin:
// ==================================================================================================

//Getting Products from Admin:
const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}) //find all products
            .sort({ category: 1 }) //Sort the Category in ascending order
            .select("name price category"); //only show selected fields
        return res.json(products);
    } catch (error) {
        next(error)
    }
}


// Deleting Products by Admin:
const adminDeleteProducts = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail();
        await product.deleteOne();
        res.json({ message: "product removed" });
    } catch (error) {
        next(error)
    }
}


// Create a New Product by Admin:
const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product();
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name;
        product.description = description;
        product.count = count;
        product.price = price;
        product.category = category;
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        await product.save();

        res.json({
            message: "product created",
            productId: product._id
        })
    } catch (error) {
        next(error)
    }
}

// Update a New Product by Admin (similar to Create a product):
const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail();
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name || product.name; //if there is no new name, then use name value.
        product.description = description || product.description;
        product.count = count || product.count;
        product.price = price || product.price;
        product.category = category || product.category;
        if (attributesTable.length > 0) {
            product.attrs = [];
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        } else {
            product.attrs = [];
        }
        await product.save();

        res.json({
            message: "product updated"
        })
    } catch (error) {
        next(error)
    }
}

// POST Route: Uploading Images when Creating new Product:
const adminUpload = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            let product = await Product.findById(req.query.productId).orFail();
            product.images.push({ path: req.body.url });
            await product.save();
        } catch (err) {
            next(err)
        }
        return;
    }
    try {
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send("No files were uploaded!");
        }

        // Image Validation imported from Utils:
        const validateResult = imageValidate(req.files.images);
        if (validateResult.error) {
            return res.status(400).send(validateResult.error);
        }

        //specify where the uploaded images is saved in server
        const path = require("path");
        const { v4: uuidv4 } = require("uuid");
        const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products");

        // find the product that user wants to update for image upload:
        let product = await Product.findById(req.query.productId).orFail();

        let imagesTable = [];
        // If there is multiple image upload:
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images;
        } else {
            imagesTable.push(req.files.images)
        }

        for (let image of imagesTable) {
            var fileName = uuidv4() + path.extname(image.name);
            var uploadPath = uploadDirectory + "/" + fileName;
            // attach the image to the product at upload:
            product.images.push({ path: "/images/products/" + fileName });
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            })
        }
        await product.save();
        return res.send("Thank you for uploading your images!");

    } catch (error) {
        next(error)
    }
}


// Delete Route: Deleting Product Image by the Admin:
const adminDeleteProductImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath);

    // If the image request is from cloudinary to remove the image:
    if (req.query.cloudinary === "true") {
        try {
            await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail();
            return res.end();
        } catch (er) {
            next(er);
        }
        return;
    }

    // If the image request is from localhost to remove the image:
    try {

        const path = require("path");
        const finalPath = path.resolve("../frontend/public") + imagePath

        const fs = require("fs");
        fs.unlink(finalPath, (error) => {
            if (error) {
                res.status(500).send(error);
            }
        })

        // Finding the product and updating it by removing its path pull operator:
        await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail();
        return res.end();

    } catch (error) {
        next(error);
    }

}

module.exports = { getProducts, getProductbyId, getBestsellers, adminGetProducts, adminDeleteProducts, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage };