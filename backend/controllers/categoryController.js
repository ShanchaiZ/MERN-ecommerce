// Imported Model:
const Category = require("../models/CategoryModel");


// GET Request: Find all categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ name: "asc" }).orFail();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

//POST Request: Create a new Category
const newCategory = async (req, res, next) => {
    try {
        const { category } = req.body;
        if (!category) {
            res.status(400).send("category input required!"); // Error 400 status = user related errors.
        } else {
            const categoryExists = await Category.findOne({ name: category });
            if (categoryExists) {
                res.status(400).send("Category already Exists!");
            } else {
                const categoryCreated = await Category.create({
                    name: category

                })
                res.status(201).send({ categoryCreated: categoryCreated }) //201 status = successful user request with new resource creation 
            }
        }
    } catch (error) {
        next(error);
    }
}


//DELETE Request: Delete a Category
const deleteCategory = async (req, res, next) => {
    // return res.send(req.params.category);
    try {
        if (req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove;
            res.json({ categoryDeleted: true });
        }
    } catch (error) {
        next(error);
    }
}


// POST Request: Saving an Attribute after creating a category
const saveAttr = async (req, res, next) => {
    const { key, val, categoryChosen } = req.body;
    if (!key || !val || !categoryChosen) {
        return res.status(400).send("All inputs are required!")
    } else {
        try {
            const category = categoryChosen.split("/")[0]
            const categoryExists = await Category.findOne({ name: category }).orFail();

            if (categoryExists.attr.length > 0) {
                // if key exists in the database, then add a value to the key
                var keyDoesNotExistInDatabase = true;

                if (keyDoesNotExistInDatabase) {
                    categoryExists.attrs.push({ key: key, value: [val] }); // if keyDoesNotExistInDatabase is true then push the new key in the attribute array
                }
            } else {
                // push to the attributes array as per CategoryModel
                categoryExists.attrs.push({ key: key, value: [val] });
            }
        } catch (error) {
            next(error);
        }

    }
}


module.exports = { getCategories, newCategory, deleteCategory, saveAttr };