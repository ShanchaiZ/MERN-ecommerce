const express = require("express");
const router = express.Router();
const { getCategories, newCategory } = require("../controllers/categoryController");

//GET ROUTE: Find all Categories:
router.get("/", getCategories);

// POST ROUTE: Create a New Category:
router.post("/", newCategory);

module.exports = router;