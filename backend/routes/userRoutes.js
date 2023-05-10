const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile } = require("../controllers/userController");


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

// ADMIN PROTECTED ROUTES:
// ===================================================================================================
// Middleware: Verify if user is logged in AS AN ADMIN to use Admin routes:
router.use(verifyIsAdmin);

// GET Route: Find all users:
router.get("/", getUsers);

module.exports = router;