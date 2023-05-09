const express = require("express");
const router = express.Router();
const { getUsers, registerUser, loginUser } = require("../controllers/userController");


// USER ROUTES:
// ===================================================================================================
// POST Route: Register a new user:
router.post("/register", registerUser);

// POST Route: User Log in:
router.post("/login", loginUser);


// ADMIN ROUTES:
// ===================================================================================================
// GET Route: Find all users:
router.get("/", getUsers);

module.exports = router;