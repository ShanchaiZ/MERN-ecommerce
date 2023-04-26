const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
    try {
        const pageNum = Number(req.query.pageNum) || 1; //number inputted by user or by default set to 1.
        const totalProducts = await Product.countDocuments({}); //provides a total count of all products in a database.

        const products = await Product

            .find({}) //finds all products in the db hence the empty {}
            .sort({ name: 1 })//instead of "asc" string to sort in name in ascending order, 1 also works! Note: -1 = descending order
            .limit(recordsPerPage) //limits the amount of product results that can be displayed; used for pagination
            .skip(recordsPerPage * (pageNum - 1)); //skips over the number of records in the argument and displays results after the skipped number indicated by recordsPerPage

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) // Take the upper limit of number of all the products in a database and divide by the recordsPerPage number which results in number of product links that can be displayed on a page.
        });
    } catch (error) {
        next(error)
    }
};

module.exports = getProducts;