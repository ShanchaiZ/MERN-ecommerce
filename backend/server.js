//Installed Dependencies:
const express = require("express");
const app = express();
const port = 3001;


// Middleware:
//====================================================================
app.use((req, res , next) =>{
    console.log("first middleware");
    next();
})




//Routes:
//=====================================================================
app.get("/", (req, res) => {
    res.send("Hello Shoppers!!")
});

app.get("/home", (req, res) => {
    res.send("Welcome to Home Page Shoppers!!")
    console.log("second middleware!")
});

// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})