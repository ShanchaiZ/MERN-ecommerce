const Order = require("../models/OrderModel");
const ObjectId = require("mongodb").ObjectId;


const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: new ObjectId(req.user._id) });
        res.send(orders);
    } catch (error) {
        next(error);
    }
};

module.exports = getUserOrders;