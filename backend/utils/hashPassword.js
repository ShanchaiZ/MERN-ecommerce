const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Hashing a password with salt:
const hashPassword = password => bcrypt.hashSync(password, salt);

// Comparing Passwords (requires 2 argument of input password and hashed password) to be compared:
const comparePasswords = (inputPassword, hashedPassword) => bcrypt.compareSync(inputPassword, hashedPassword);

module.exports = { hashPassword, comparePasswords };