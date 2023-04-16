const mongoose = require("mongoose");
const Review = require("./ReviewModel");
const imageSchema = mongoose.Schema({
    path: { type: String, required: true }
});


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
    images: [imageSchema],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Review,
        }
    ]
}, {
    timestamps: true,
})


productSchema.index(); //this index method is used to make unique property work in the name

const Product = mongoose.model("Product", productSchema);

module.exports = Product;