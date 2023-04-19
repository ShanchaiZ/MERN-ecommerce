const connectDB = require("../config/db");
connectDB();

// Imported the Seeder files:
const categoryData = require("./categories");
const productData = require("./products");


// Imported the Seeder Models:
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");


const importData = async () => {
    try {
        // Drop Seeder Indexes:
        // await Category.collection.dropIndexes();
        // await Product.collection.dropIndexes();

        // Delete Seeder Collections:
        await Category.collection.deleteMany({});
        await Product.collection.deleteMany({});

        // Create Seeder Collection:
        await Category.collection.insertMany(categoryData);
        await Product.collection.insertMany(productData);


        console.log("Data Seeding is Successful!");
        process.exit();
    } catch (error) {
        console.log("Data Seeding Error:", error)
    }
}

importData();