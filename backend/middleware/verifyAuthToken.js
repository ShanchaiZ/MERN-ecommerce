const jwt = require("jsonwebtoken");

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

module.exports = { verifyIsLoggedIn };