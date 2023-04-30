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
        type: Number
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

// Product Model Creation:
const Product = mongoose.model("Product", productSchema);

// Creating Index to query for products faster:
productSchema.index({ name: "text", description: "text" }, { name: "TextIndex" }); //this compound index method is used to make unique property work in the name
productSchema.index({ "attrs.key": 1, "attrs.value": 1 }); //This index is used to sort attributes key and values in ascending order
// productSchema.index({ name : -1 }); // This single field index is used to sort index in descending order (hence minus sign)
// productSchema.index({ category: 1 }); // This single field index is used to find product only by category  
// productSchema.index({ name: 1 }); // This single field index is used to find product only by name


module.exports = Product;