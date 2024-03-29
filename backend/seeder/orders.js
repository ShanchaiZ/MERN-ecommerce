const ObjectId = require("mongodb").ObjectId;

const orders = Array.from({ length: 20 }).map((_, idx) => {
    const currentDate = new Date();
    // Defining Month:
    let month;
    let monthNumber = (currentDate.getMonth() + 1).toString();
    if (monthNumber.length === 1) {
        month = "0" + monthNumber;
    } else {
        month = monthNumber;
    }

    // Defining Day:
    let day;
    let dayNumber= currentDate.getDate().toString();
    if (dayNumber.length === 1){
        day = "0" + dayNumber
    } else {
        day = dayNumber;
    }

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
        user: new ObjectId("646d16cf5e6b9d9477660ec2"),
        orderTotal: {
            itemsCount: 3,
            cartSubtotal: subtotal
        },
        cartItems: [
            {
                name: "Product Name",
                price: 25,
                image: { path: "/images/category/monitors-category.jpg" },
                quantity: 3,
                count: 12
            }
        ],
        paymentMethod: "PayPal",
        isPaid: "false",
        isDelivered: "false",
        createdAt: `2023-${month}-${day}T${hour}:12:34.490+00:00`
    }
})

module.exports = orders;