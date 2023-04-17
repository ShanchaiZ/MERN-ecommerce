const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "default category description"
    },
    image: {
        type: String,
        default: "/images/category/tablets-category.jpg",
    },
    attrs: [
        {
            key: { type: String }, value: [{ type: String }]
        }
    ],
});


// Category Model Creation:
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;