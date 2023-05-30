const jwt = require("jsonwebtoken");


// Verify if User is Logged in:
const verifyIsLoggedIn = (req, res, next) => {

    try {
        // Is there a Token?:
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).send("A token is required for authentication!");
        }

        //Verify if correct token to the session:
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).send("Unauthorized Access. Invalid Token");
        }

    } catch (error) {
        next(error);
    }
};


// Verify is User is as an ADMIN:
const verifyIsAdmin = (req, res, next) => {

    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).send("Unauthorized Access. Admin required");
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin };