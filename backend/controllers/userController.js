const User = require("../models/UserModel");
const { hashPassword } = require("../utils/hashPassword");


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

            // After User Registration (Cookie, Server Status and Response):
            res
                .cookie("access_token", "dummy access token", {
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
}

module.exports = { getUsers, registerUser };