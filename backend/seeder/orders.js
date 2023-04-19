const ObjectId = require("mongodb").ObjectId;

const orders = Array.from({ length: 20 }).map((_, idx) => {
    let day = 20;
    if (idx < 10) {
        var hour = "0" + idx;
        var subtotal = 100;
    } else if (idx > 16 && idx < 21) {
        var hour = idx;
        var subtotal = (100 + 12 * idx);
    } else {
        var hour = idx;
        var subtotal = 100;
    }
    return {
        user: ObjectId(),
        orderTotal: {
            itemsCount: 3,
            cartSubtotal: subtotal
        },
        cartItems: [
            {
                name: "Product Name",
                price: 25,
                image: { path: "/images/category/monitors-category.jpg" },
                quantity: 33,
                count: 12
            }
        ],
        paymentMethod: "PayPal",
        isPaid: "false",
        isDelivered: "false",
        createdAt: `2023-03-${day}T${hour}:12:34.490+00:00`
    }
})

module.exports = orders;