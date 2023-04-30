const express = require("express");
const router = express.Router();
const { getProducts, getProductbyId, getBestsellers, adminGetProducts } = require("../controllers/productController");


// USER ROUTES:
// ===================================================================================================

// GET Route: Using Search Bar to search for Particular Category:
router.get("/category/:categoryName/search/:searchQuery", getProducts);

// GET Route: Using Search Bar to search for Category:
router.get("/category/:categoryName", getProducts);

// GET Route: Searching Through Particular Categories using Dropdown:
router.get("/search/:searchQuery", getProducts);

// GET Route: all Products:
router.get("/", getProducts);

// GET Route: the bestsellers in the banner:
router.get("/bestsellers", getBestsellers);

//GET route: Get Product details by ID:
router.get("/get-one/:id", getProductbyId);


// ADMIN ROUTES:
// ===================================================================================================
router.get("/admin", adminGetProducts);



module.exports = router;