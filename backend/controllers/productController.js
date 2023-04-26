const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
    try {
        const pageNum = Number(req.query.pageNum) || 1
        // res.json({pageNum});

        const products = await Product

            .find({}) //finds all products in the db hence the empty {}
            .sort({ name: 1 })//instead of "asc" string to sort in name in ascending order, 1 also works! Note: -1 = descending order
            .limit(recordsPerPage) //limits the amount of product results that can be displayed; used for pagination
            .skip(recordsPerPage * (pageNum - 1)); //skips over the number of records in the argument and displays results after the skipped number indicated by recordsPerPage

        res.json({ products });
    } catch (error) {
        next(error)
    }
};

module.exports = getProducts;