const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastname, email, isAdmin) => {
    return jwt.sign(
        { _id, name, lastname, email, isAdmin },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "12h" }
    );
};

module.exports = generateAuthToken;