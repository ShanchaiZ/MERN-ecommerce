const express = require("express");
const router = express.Router();
const getProducts = require("../controllers/productController");


// GET Route: Using Search Bar to search for Particular Category:
router.get("/category/:categoryName/search/:searchQuery", getProducts);

// GET Route: Using Search Bar to search for Category:
router.get("/category/:categoryName", getProducts);


// GET Route: Searching Through Particular Categories using Dropdown:
router.get("/search/:searchQuery", getProducts);

router.get("/", getProducts);

module.exports = router;