const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product
            .find({}) //finds all products in the db hence the empty {}
            .sort({ name: 1 })//instead of "asc" string to sort in name in ascending order, 1 also works! Note: -1 = descending order
            .limit(recordsPerPage); //limits the amount of product results that can be displayed; used for pagination

        res.json({ products });
    } catch (error) {
        next(error)
    }
};

module.exports = getProducts;