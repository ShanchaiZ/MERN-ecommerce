//Installed Dependencies:
const express = require("express");
const app = express();
const port = 3001;

const apiRoutes = require("./routes/apiRoutes");

// Middleware:
//====================================================================
app.use("/api" , apiRoutes);



//Routes:
//=====================================================================
app.get("/", (req, res) => {
    res.send("Hello Shoppers!!")
});


//Example of the routing path:
// app.get("/api/products", (req, res) => {
//     res.send("handling products routes")
// })

// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})