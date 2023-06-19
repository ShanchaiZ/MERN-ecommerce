const products = [
    {
        name: "Toshiba Laptop",
        description: "Laptop product 1 - Lorem ipsum dolor sit amet. Cum nulla dolorem ut dolorem esse sed fugiat deleniti ad facilis inventore sit unde itaque 33 sequi numquam. Non mollitia laudantium et mollitia placeat hic velit inventore eos iste neque aut expedita quis!",
        count: 5,
        price: 5,
        category: "Videos",
        images: [
            { path: "/images/category/computers-category.jpg" },
            { path: "/images/category/computers-category.jpg" },
            { path: "/images/category/computers-category.jpg" },
        ],
        rating: 5,
        reviewsNumber: 10,
        reviews: [],
        attrs:[
            {key:"color", value: "red"}
        ]
    },
    {
        name: "Picture of Dorian Gray",
        description: "Book 2 - Lorem ipsum dolor sit amet. Cum nulla dolorem ut dolorem esse sed fugiat deleniti ad facilis inventore sit unde itaque 33 sequi numquam. Non mollitia laudantium et mollitia placeat hic velit inventore eos iste neque aut expedita quis!",
        count: 5,
        price: 2,
        category: "Books",
        images: [
            { path: "/images/category/books-category.jpg" },
            { path: "/images/category/books-category.jpg" },
            { path: "/images/category/books-category.jpg" },
        ],
        rating: 5,
        reviewsNumber: 20,
        reviews: [],
        attrs:[
            {key:"genre", value: "Suspense"}
        ]
    },
    {
        name: "Tom Tom GPS",
        description: " TOM TOM GPS 3 - Lorem ipsum dolor sit amet. Cum nulla dolorem ut dolorem esse sed fugiat deleniti ad facilis inventore sit unde itaque 33 sequi numquam. Non mollitia laudantium et mollitia placeat hic velit inventore eos iste neque aut expedita quis!",
        count: 2,
        price: 200,
        category: "electronics",
        images: [
            { path: "/images/category/electronics-category.jpg" },
            { path: "/images/category/electronics-category.jpg" },
            { path: "/images/category/electronics-category.jpg" },
        ],
        rating: 4,
        reviewsNumber: 10,
        reviews: [],
        attrs:[
            {key:"color", value: "blue"}
        ]
    },
    {
        name: "Lenovo Monitor",
        description: " Monitor 3 - Lorem ipsum dolor sit amet. Cum nulla dolorem ut dolorem esse sed fugiat deleniti ad facilis inventore sit unde itaque 33 sequi numquam. Non mollitia laudantium et mollitia placeat hic velit inventore eos iste neque aut expedita quis!",
        count: 2,
        price: 200,
        category: "electronics",
        images: [
            { path: "/images/category/monitors-category.jpg" },
            { path: "/images/category/monitors-category.jpg" },
            { path: "/images/category/monitors-category.jpg" },
        ],
        rating: 5,
        reviewsNumber: 16,
        reviews: [],
        attrs:[
            {key:"color", value: "black"},
            {key:"RAM", value: "1 TB"},
        ]
    },
]


module.exports = products;