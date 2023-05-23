const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

const users = [
    {
        name: "admin",
        lastName: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("admin@admin.com", 10),
        isAdmin: true
    },
    {
        _id: new ObjectId("646d16cf5e6b9d9477660ec2"),
        name: "John",
        lastName: "Doe",
        email: "john@doe.com",
        password: bcrypt.hashSync("john@doe.com", 10),
        isAdmin: false
    },

]

module.exports = users;