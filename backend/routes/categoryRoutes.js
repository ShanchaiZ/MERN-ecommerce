// Dependencies and Variables:
// ====================================================================================================
const express = require("express");
const router = express.Router();
const { getCategories, newCategory, deleteCategory, saveAttr } = require("../controllers/categoryController");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");


// ROUTES:
// ===================================================================================================
//GET ROUTE: Find all Categories:
router.get("/", getCategories);



// MIDDLEWARE:
// ===================================================================================================
//Verify if user is logged in:
router.use(verifyIsLoggedIn);

//Verify if user is logged in AS AN ADMIN:
router.use(verifyIsAdmin);


// PROTECTED ROUTES:
//===================================================================================================
// POST ROUTE: Create a New Category:
router.post("/", newCategory);

// DELETE ROUTE: Delete a Category:
router.delete("/:category", deleteCategory);

// POST Route: Create an Attribute when making a new Category:
router.post("/attr", saveAttr);

module.exports = router;