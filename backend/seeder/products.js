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
        attrs: [
            { key: "color", value: "black" }
        ]
    },
    {
        name: "Picture of Dorian Gray",
        description: "In The Picture of Dorian Gray by Oscar Wilde, a young man named Dorian Gray becomes obsessed with pleasure and beauty in 19th-century London. He makes a wish that a portrait of him ages instead of him, allowing him to live without facing the consequences of his actions. As he indulges in a reckless life, his portrait reflects his inner decay. This thought-provoking story explores the price of vanity and the impact of our choices.",
        count: 5,
        price: 15,
        category: "Books",
        images: [
            { path: "/images/products/dorianGray1.jpg" },
            { path: "/images/products/dorianGray2.jpg" },
            { path: "/images/products/dorianGray3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 20,
        reviews: [],
        attrs: [
            { key: "genre", value: "Suspense" }
        ]
    },
    {
        name: "Tom Tom GPS",
        description: "Introducing the TomTom GPS Navigator, your ultimate travel companion for seamless journeys. Navigating unfamiliar roads with confidence is now effortless, thanks to its user-friendly interface and advanced mapping technology. Whether you're embarking on a road trip or simply commuting through the city, the TomTom GPS ensures you reach your destination efficiently. Real-time traffic updates and alternate route suggestions keep you ahead of congestion, while its crystal-clear display and voice-guided directions provide stress-free navigation. With a sleek design that fits perfectly in any vehicle, the TomTom GPS is the essential tool for unlocking a world of hassle-free exploration and smooth travels.",
        count: 2,
        price: 300,
        category: "Electronics",
        images: [
            { path: "/images/products/tomtomgps1.jpg" },
            { path: "/images/products/tomtomgps2.jpg" },
        ],
        rating: 5,
        reviewsNumber: 20,
        reviews: [],
        attrs: [
            { key: "color", value: "silver" }
        ]
    },
    {
        name: "Lenovo Monitor",
        description: "Elevate your visual experience with the Lenovo Monitor. Immerse yourself in stunning clarity and vibrant colors on its sleek display. Whether you're working, gaming, or streaming your favorite content, the Lenovo Monitor delivers crisp images and smooth performance. With adjustable settings and ergonomic design, it ensures optimal comfort for prolonged use. Bring your digital world to life and redefine your workspace with the exceptional quality and modern design of the Lenovo Monitor.",
        count: 2,
        price: 250,
        category: "Monitors",
        images: [
            { path: "/images/products/lenovoMonitor1.jpg" },
            { path: "/images/products/lenovoMonitor2.jpg" },
            { path: "/images/products/lenovoMonitor3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 16,
        reviews: [],
        attrs: [
            { key: "color", value: "black" },
            { key: "Screen size", value: "24inch" },
        ]
    },
]


module.exports = products;