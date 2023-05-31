const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");


// Find all Users:
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        return res.json(users);
    } catch (error) {
        next(error);
    }
};


// Create a New User:
const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body;
        if (!(name && lastName && email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("User Exists");
        } else {
            const hashedPassword = hashPassword(password);
            const user = await User.create({
                name: name,
                lastName: lastName,
                email: email.toLowerCase(),
                password: hashedPassword
            });

            // After User Registration 
            // (Cookie (imported the jwt auth function with necessary user data as its function arguments), 
            // Server Status and Response):
            res
                .cookie("access_token",
                    generateAuthToken(
                        user._id,
                        user.name,
                        user.lastName,
                        user.email,
                        user.isAdmin
                    ),
                    {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict"
                    })
                .status(201)
                .json({
                    success: "User Created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin
                    },
                });
        }

    } catch (error) {
        next(error);
    }
};


// User Login:
const loginUser = async (req, res, next) => {
    try {
        const { email, password, doNotLogout } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All fields are required")
        }

        // If User with same email and matching passwords:
        const user = await User.findOne({ email }).orFail();
        if (user && comparePasswords(password, user.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            };

            // If Do not logout is selected by user in the front end:
            if (doNotLogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; //where 1000ms = 1sec
            }
            return res
                .cookie("access_token",
                    generateAuthToken(
                        user._id,
                        user.name,
                        user.lastName,
                        user.email,
                        user.isAdmin
                    ),
                    cookieParams)
                .json({
                    success: "User Logged in",
                    userLoggedIn: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        doNotLogout
                    }
                });
        } else {
            return res.status(401).send("Incorrect Credentials");
        }
    } catch (error) {
        next(error);
    }
};


// Update User profile data:
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();

        // User Profile fields that can be updated:
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;

        // User Profile password Update:
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password);
        }
        // User Profile Updated for save in db:
        await user.save();
        return res.json({
            success: "User Profile Updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Fetching User data from Database:
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();
        return res.send(user);
    } catch (error) {
        next(error);
    }
};

// Create a Review for a Product:
const writeReview = async (req, res, next) => {
    try {

        // To ensure BOTH database operations (Create  and Save) are completed/failed in sync:
        const session = await Review.startSession();

        // get comment, rating from request. body:
        const { comment, rating } = req.body;
        // validate request:
        if (!(comment && rating)) {
            return res.status(400).send("All fields are required");
        }
        // create review id manually because it is also needed for saving Product collection:
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = new ObjectId();


        session.startTransaction(); //First database transaction: Create a Review

        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
            }
        ], { session: session });

        const product = await Product.findById(req.params.productId).populate("reviews").session(session);

        // If Product Already Reviewed:
        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            await session.abortTransaction(); // if a review is already created, no need to write again in db and...
            session.endSession(); //...therefore end the session but if event is successfully completed then...
            return res.status(400).send("Product already reviewed!");
        }

        //Once a product is found in database with that ID:
        let prc = [...product.reviews];
        prc.push({ rating: rating });
        product.reviews.push(reviewId);

        // If this is the only review for this product:
        if (product.reviews.length === 1) {
            product.rating = Number(rating);
            product.reviewsNumber = 1;
            // Otherwise, there is already a review for this product:
        } else {
            product.reviewsNumber = product.reviews.length;
            // used to calculate the average rating:
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
        }
        await product.save(); //Second database transaction: Save Review in Database

        //...If we successfully created and wrote in the database then:
        await session.commitTransaction(); // ENSURES BOTH database operations are performed
        session.endSession(); //Session and database transaction completed

        return res.send("Review created!");
    } catch (error) {
        await session.abortTransaction(); //Abort database operations if any error to prevent desync database operations
        next(error);
    }
}

// Fetching User Data for editing by Admin:
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail();
        return res.send(user);
    } catch (error) {
        next(error);
    }
}

// Updating a User details by Admin:
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        await user.save();

        res.send("User profile updated");
    } catch (error) {
        next(error);
    }
}

// Delete a User by Admin:
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        await user.deleteOne();
        return res.send("User removed");

    } catch (error) {
        next(error);
    }
}


module.exports = { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser };