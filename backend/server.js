//Installed Dependencies:
const express = require("express");
const app = express();
const port = 3001;

const apiRoutes = require("./routes/apiRoutes");

// MongoDB Connection:
//=====================================================================
const connectDB = require("./config/db");
connectDB();

// Middleware:
//====================================================================
app.use("/api", apiRoutes);



//Routes:
//=====================================================================
app.get("/", async (req, res, next) => {
    // Example to see if product model is being created and saved in the database for testing:
    const Product = require("./models/ProductModel");
    try {
        const product = new Product;
        product.name = "Apple";
        const productSaved = await product.save();
        console.log(productSaved === product);
        //find a product:
        const products = await Product.find();
        console.log(products.length);
        res.send("Product created " + product._id);
    } catch (err) {
        console.log(err);
        next(err);
    }
    // res.send("Hello Shoppers!!");
});

//Example of the routing path:
// app.get("/api/products", (req, res) => {
//     res.send("handling products routes")
// })



// Error Handler in console:
// ===================================================================
app.use((error, req, res, next) => {
    console.error(error)
    next(error);
})

// Error Handler displayed in WebBrowser:
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
});


// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})