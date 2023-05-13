const Order = require("../models/OrderModel");
const ObjectId = require("mongodb").ObjectId;
const Product = require("../models/ProductModel");


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


// Create an Order:
const createOrder = async (req, res, next) => {
    try {
        // An Order requires CartItems, OrderTotal and PaymentMethod:
        const { cartItems, orderTotal, paymentMethod } = req.body;
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All fields are required!");
        }

        // Take the Product item's ID and place in ids array
        let ids = cartItems.map((item) => {
            return item.productID;
        });
        // Take the Quantity of items and place in qty array 
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        });

        // Find each product that is $included in the ids array then increase the quantity under product sales then save as new product.
        await Product.find({ _id: { $in: ids } }).then((products) => {
            products.forEach(function (product, idx) {
                product.sales += qty[idx];
                product.save();
            })
        })

        // Once product items are totaled place inside a new order object with such criteria below:
        const order = new Order({
            user: new ObjectId(req.user._id),
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod
        })

        // Then save order:
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);
    } catch (error) {
        next(error);
    }
};


// Update an Order (To be paid):
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

// Update an Order by Admin (To be Delivered):
const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};


// Fetching Orders from all Users by Admin:
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (error) {
        next(error);
    }
};

module.exports = { getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders };