// Imported Model:
const Category = require("../models/CategoryModel");


// GET Request: Find all categories
const getCategories = async (req, res, next) => {
    try {
        const cagetories = await Category.find({}).sort({ name: "asc" }).orFail();
        res.json(cagetories);
    } catch (error) {
        next(error);
    }
};

//POST Request: Create a new Category
const newCategory = async (req, res, next) => {
    try {
        res.send(!!req.body); //1 exclamation mark = turns the req.body into a boolean value (which is TRUE).  2 exclamation marks = gives the opposite the value of !req.body which is FALSE.
    } catch (err) {
        next(err);
    }
}

module.exports =  {getCategories, newCategory};