const Order = require("../models/OrderModel");
const ObjectId = require("mongodb").ObjectId;


// Get All orders for a specific User:
const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: new ObjectId(req.user._id) });
        res.send(orders);
    } catch (error) {
        next(error);
    }
};

// Get Details of the Order for a specific User: 
const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        res.send(order);
    } catch (error) {
        next(error);
    }
}


module.exports = {getUserOrders, getOrder};