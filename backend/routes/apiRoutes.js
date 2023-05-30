const express = require("express");
const app = express();

// Imported File for Path:
// ====================================================================
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

const jwt = require("jsonwebtoken");

// Logout FUnction:
app.get("/logout" , (req, res) => {
    return res.clearCookie("access_token").send("access token cleared")
});


// Session Cookies for Authorized Access to Routes:
app.get("/get-token", (req, res) => {

    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (error) {
        return res.status(401).send("Unauthorized Access. Invalid Token!");
    }
});

// Middleware:
// ====================================================================
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
