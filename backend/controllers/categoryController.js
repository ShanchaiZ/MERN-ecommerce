// Imported Model:
const Category = require("../models/CategoryModel");


const getCategories = async (req, res, next) => {
    try {
        const cagetories = await Category.find({}).sort({name: "asc"}).orFail();
        res.json(cagetories);
    } catch (error) {
        next(error);
    }
};

module.exports = getCategories;