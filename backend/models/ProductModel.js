const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewsNumber: {
        type: Number
    },
    sales: {
        type: Number,
        default: 0,
    },
    attrs: [
        //a product in a category can be further classified by -> [{key:"color", value: "red"}, {key: "size", value: "1 TB"}]
        { key: { type: String }, value: { type: String } }
    ],
    images: [],
    reviews: []
}, {
    timestamps: true,
})


productSchema.index();

const Product = mongoose.model("Product", productSchema);

module.exports = Product;