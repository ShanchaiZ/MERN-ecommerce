const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUserOrders, getOrder, createOrder } = require("../controllers/orderController");


// USER PROTECTED ROUTES:
// ===================================================================================================
// Verify if user is logged in:
router.use(verifyIsLoggedIn);

// GET Route: User Fetches their orders:
router.get("/", getUserOrders);

// GET Route: User Fetches their orders:
router.get("/user/:id", getOrder);

// POST Route: Create/Save an Order in database:
router.post("/", createOrder);

//PROTECTED ADMIN ROUTES:
// ===================================================================================================
// Verify if user is logged in AS AN ADMIN:
router.use(verifyIsAdmin);



module.exports = router;