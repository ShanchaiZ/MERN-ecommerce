const express = require("express");
const router = express.Router();
const { getUsers, registerUser } = require("../controllers/userController");


// USER ROUTES:
// ===================================================================================================
router.post("/register", registerUser);


// ADMIN ROUTES:
// ===================================================================================================
// GET Route: Find all users:
router.get("/", getUsers);

module.exports = router;