//Installed Dependencies:
const express = require("express");
const app = express();
const port = 3001;



app.get("/", (req, res) => {
    res.send("Hello Shoppers!!")
});





// App is listening on port:
//======================================================================
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})