const express = require("express");
const app = express();

// Imported File for Path:
// ====================================================================
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

// Session Cookies for Authorized Access to Routes:
const jwt = require("jsonwebtoken");
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
