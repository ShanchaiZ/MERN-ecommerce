const connectDB = require("../config/db");
connectDB();

const categoryData = require("./categories");
const Category = require("../models/CategoryModel");

const importData = async () => {
    try {
        // Category.collection.dropIndexes();
        await Category.collection.deleteMany({});
        await Category.collection.insertMany(categoryData);
        console.log("Data Seeding is Successful!");
        process.exit();
    } catch (error) {
        console.log("Data Seeding Error:", error)
    }
}

importData();