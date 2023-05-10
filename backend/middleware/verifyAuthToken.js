

const verifyIsLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        console.log(token);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyIsLoggedIn };