const express = require("express");
const router = express.Router();
const { getProducts, getProductbyId, getBestsellers, adminGetProducts, adminDeleteProducts, adminCreateProduct, adminUpdateProduct, adminUpload } = require("../controllers/productController");


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

// GET Route: Getting Product by Admin: 
router.get("/admin", adminGetProducts);

// Delete Route: Deleting Products by the Admin:
router.delete("/admin/:id", adminDeleteProducts);

// PUT Route: Update a Product by the Admin:
router.put("/admin/:id", adminUpdateProduct);


// POST Route: Creating Product in the Admin Form:
router.post("/admin", adminCreateProduct);


// POST Route: Uploading Images when Creating new Product:
router.post("/admin/upload", adminUpload);

module.exports = router;