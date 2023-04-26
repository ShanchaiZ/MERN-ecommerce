const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).sort({ name: 1 }) //instead of "asc" string to sort in name in ascending order, 1 also works! Note: -1 = descending order
        res.json({ products });
    } catch (error) {
        next(error)
    }
};

module.exports = getProducts;