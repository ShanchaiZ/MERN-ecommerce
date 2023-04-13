//Installed Dependencies:
const express = require("express");
const app = express();
const port = 3001;

const apiRoutes = require("./routes/apiRoutes");

// Middleware:
//====================================================================
app.use("/api", apiRoutes);



//Routes:
//=====================================================================
app.get("/", (req, res) => {
    console.log("synchronous code!");
    throw new Error("Error Occured!");
    res.send("Hello Shoppers!!");
});

//Async error example:
app.get("/a", (req, res, next) => {
    setTimeout(() => {
        console.log("Async Code");
        throw new Error("Error Occured!!!");
        next();
    }, 2000);
    // res.send("Hello World");
})

//Example of the routing path:
// app.get("/api/products", (req, res) => {
//     res.send("handling products routes")
// })

// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})