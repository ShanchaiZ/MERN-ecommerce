const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUserOrders, getOrder } = require("../controllers/orderController");


// USER PROTECTED ROUTES:
// ===================================================================================================
// Verify if user is logged in:
router.use(verifyIsLoggedIn);

// GET Route: User Fetches their orders:
router.get("/", getUserOrders);

// GET Route: User Fetches their orders:
router.get("/user/:id", getOrder);

//PROTECTED ADMIN ROUTES:
// ===================================================================================================
// Verify if user is logged in AS AN ADMIN:
router.use(verifyIsAdmin);



module.exports = router;