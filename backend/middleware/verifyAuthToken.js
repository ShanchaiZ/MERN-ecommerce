

const verifyIsLoggedIn = (req, res, next) => {
    try {
        console.log("Admin middleware here!");
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyIsLoggedIn };