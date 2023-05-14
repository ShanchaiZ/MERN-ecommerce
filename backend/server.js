//Installed Dependencies:
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

const apiRoutes = require("./routes/apiRoutes");

// MongoDB Connection:
//=====================================================================
const connectDB = require("./config/db");
connectDB();

// Middleware:
//====================================================================
app.use(express.json()); //used to parse json object for express to read from each request
app.use(cookieParser()); //used to parse cookies for authentication and session logins
app.use(fileUpload()); //used for uploading files

app.use("/api", apiRoutes);

//Routes:
//=====================================================================
app.get("/", async (req, res, next) => {
    res.send("Hello Shoppers!!");
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