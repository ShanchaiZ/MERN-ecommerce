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
    // throw new Error("Error Occured!");
    res.send("Hello Shoppers!!");
});

//Async error example:
app.get("/a", (req, res, next) => {
    setTimeout(() => {
        try {
            aconsole.log("async Code!!")
        } catch (error) {
            next(error);
        }

    }, 2000);
    // res.send("Hello World");
})

//Example of the routing path:
// app.get("/api/products", (req, res) => {
//     res.send("handling products routes")
// })


// Error Handler in console:
app.use((error, req, res, next) =>{
    console.error(error)
    next(error);
})

// Error Handler displayed in WebBrowser:
app.use((error,req,res,next) =>{
    res.status(500).json ({
        message: error.message,
        stack: error.stack
    })
});


// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})