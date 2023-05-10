const User = require("../models/UserModel");
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
            return res.status(400).send("user exists");
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
        const user = await User.findOne({ email });
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

module.exports = { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile };