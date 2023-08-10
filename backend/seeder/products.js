const products = [
    {
        name: "Toshiba Laptop",
        description: "Introducing the Toshiba Laptop – a sleek and powerful computing companion designed to elevate your productivity and entertainment experience. With cutting-edge performance, vibrant visuals, and seamless connectivity, this laptop offers a perfect blend of style and functionality. Whether you're tackling work tasks, enjoying multimedia, or staying connected on the go, the Toshiba Laptop delivers exceptional performance and reliability in a compact and elegant package.",
        count: 3,
        price: 300,
        category: "Laptops",
        images: [
            { path: "/images/products/toshibaLaptop1.jpg" },
            { path: "/images/products/toshibaLaptop2.jpg" },
            { path: "/images/products/toshibaLaptop3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 10,
        reviews: [],
        attrs:[
            {key:"color", value: "black"}
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