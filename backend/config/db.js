// Installed Dependencies

const mongoose = require("mongoose");

//Process of Connecting mongodb server to mongoose: 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connection SUCCESSFUL!")
    } catch (error) {
        console.log(`MongoDB connection FAILED! This is the error: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB;