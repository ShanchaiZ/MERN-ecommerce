const express = require("express");
const router = express.Router();
const { getCategories, newCategory, deleteCategory } = require("../controllers/categoryController");

//GET ROUTE: Find all Categories:
router.get("/", getCategories);

// POST ROUTE: Create a New Category:
router.post("/", newCategory);

// DELETE ROUTE: Delete a Category:
router.delete("/:category", deleteCategory);



module.exports = router;