const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser } = require("../controllers/userController");


// USER ROUTES:
// ===================================================================================================
// POST Route: Register a new user:
router.post("/register", registerUser);

// POST Route: User Log in:
router.post("/login", loginUser);


// User Logged in Routes Protected:
// ===================================================================================================
// Middleware: Verify if user is logged in:
router.use(verifyIsLoggedIn);

// PUT Route: Update User Profile:
router.put("/profile", updateUserProfile);

// GET Route: Fetching User Profile for updating:
router.get("/profile/:id", getUserProfile);

// POST Route: Create Review to Product:
router.post("/review/:productId", writeReview);

// ADMIN PROTECTED ROUTES:
// ===================================================================================================
// Middleware: Verify if user is logged in AS AN ADMIN to use Admin routes:
router.use(verifyIsAdmin);

// GET Route: Find all users:
router.get("/", getUsers);

//GET Route: Get User Data for editing:
router.get("/:id", getUser);

// PUT Route: Updating a User:
router.put("/:id", updateUser);

module.exports = router;