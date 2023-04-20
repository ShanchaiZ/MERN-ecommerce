const connectDB = require("../config/db");
connectDB();

// Imported the Seeder files:
const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");
const userData = require("./users");
const orderData = require("./orders");


// Imported the Seeder Models:
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");


const importData = async () => {
    try {
        // Drop Seeder Indexes:
        // await Category.collection.dropIndexes();
        // await Product.collection.dropIndexes();
        // await Review.collection.dropIndexes();
        // await User.collection.dropIndexes();
        // await Order.collection.dropIndexes();

        // Delete Seeder Collections:
        await Category.collection.deleteMany({});
        await Product.collection.deleteMany({});
        await Review.collection.deleteMany({});
        await User.collection.deleteMany({});
        await Order.collection.deleteMany({});

        // Create Seeder Collection:
        await Category.insertMany(categoryData);

        const reviews = await Review.insertMany(reviewData);
        const sampleProducts = productData.map((product) => {
            reviews.map((review) =>{
                product.reviews.push(review._id)
            })
            return {...product}
        });

        await Product.insertMany(sampleProducts);
        await User.insertMany(userData);
        await Order.insertMany(orderData);

        console.log("Data Seeding is Successful!");
        process.exit();
    } catch (error) {
        console.log("Data Seeding Error:", error)
    }
}

importData();