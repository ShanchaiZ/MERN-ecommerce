const connectDB = require("../config/db");
connectDB();

// Imported the Seeder files:
const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");


// Imported the Seeder Models:
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");


const importData = async () => {
    try {
        // Drop Seeder Indexes:
        // await Category.collection.dropIndexes();
        // await Product.collection.dropIndexes();
        // await Review.collection.dropIndexes();

        // Delete Seeder Collections:
        await Category.collection.deleteMany({});
        await Product.collection.deleteMany({});
        await Review.collection.deleteMany({});

        // Create Seeder Collection:
        await Category.insertMany(categoryData);
        await Product.insertMany(productData);
        await Review.insertMany(reviewData);


        console.log("Data Seeding is Successful!");
        process.exit();
    } catch (error) {
        console.log("Data Seeding Error:", error)
    }
}

importData();