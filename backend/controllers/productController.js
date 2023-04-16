const Product = require("../models/ProductModel");


const getProducts = (req, res) => {
    Product.create({name:"Toshiba"});
    res.send("Handling Product Routes! for example: product searching!");
};

module.exports = getProducts;