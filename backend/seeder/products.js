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
        name: "The Picture of Dorian Gray",
        description: "In The Picture of Dorian Gray by Oscar Wilde, a young man named Dorian Gray becomes obsessed with pleasure and beauty in 19th-century London. He makes a wish that a portrait of him ages instead of him, allowing him to live without facing the consequences of his actions. As he indulges in a reckless life, his portrait reflects his inner decay. This thought-provoking story explores the price of vanity and the impact of our choices.",
        count: 5,
        price: 15,
        category: "Books",
        images: [
            { path: "/images/products/dorianGray1.jpg" },
            { path: "/images/products/dorianGray2.jpg" },
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
        description: "Introducing the TomTom GPS Navigator, your ultimate travel companion for seamless journeys. Navigating unfamiliar roads with confidence is now effortless, thanks to its user-friendly interface and advanced mapping technology. Real-time traffic updates and alternate route suggestions keep you ahead of congestion, while its crystal-clear display and voice-guided directions provide stress-free navigation.",
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
    {
        name: "Alienware Gaming Computer",
        description: "Immerse yourself in the world of gaming like never before with the Alienware Gaming Computer. Engineered for unrivaled performance, this powerhouse is your ticket to seamless, action-packed gameplay. Its sleek, aggressive design not only catches the eye but also maintains optimal cooling for those marathon gaming sessions. Elevate your gaming experience to new heights!",
        count: 1,
        price: 900,
        category: "Computers",
        images: [
            { path: "/images/products/alienwareGaming1.jpg" },
            { path: "/images/products/alienwareGaming2.jpg" },
            { path: "/images/products/alienwareGaming3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 30,
        reviews: [],
        attrs: [
            { key: "color", value: "black" },
            { key: "Screen size", value: "27inch" },
        ]
    },
    {
        name: "Samsung Gaming Computer",
        description: "Unleash the power of gaming with the Samsung Gaming Computer. Engineered for peak performance, this cutting-edge machine is your gateway to immersive gameplay like never before. Equipped with advanced graphics and processing capabilities, it effortlessly handles the most demanding titles with stunning visuals and seamless frame rates. The sleek design not only exudes gaming sophistication but also incorporates efficient cooling mechanisms to keep your system running at its best. Dominate the competition!",
        count: 1,
        price: 900,
        category: "Computers",
        images: [
            { path: "/images/products/samsungGaming1.jpg" },
            { path: "/images/products/samsungGaming2.jpg" },
            { path: "/images/products/samsungGaming3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 30,
        reviews: [],
        attrs: [
            { key: "color", value: "black" },
            { key: "Screen size", value: "24inch" },
        ]
    },
    {
        name: "Basketball",
        description: "Experience the thrill of the game with our premium basketball. Designed for precision and performance, this basketball's superior grip and responsive bounce ensure you dominate the court. Whether you're practicing your shots or competing in intense matches, this basketball is your essential tool for achieving new heights in the world of basketball.",
        count: 5,
        price: 50,
        category: "Sports and Outdoors",
        images: [
            { path: "/images/products/basketball1.jpg" },
            { path: "/images/products/basketball2.jpg" },
            { path: "/images/products/basketball3.jpg" },
        ],
        rating: 4,
        reviewsNumber: 10,
        reviews: [],
        attrs: [
            { key: "color", value: "orange" },
            { key: "gear", value: "recreational" },
        ]
    },
    {
        name: "Tennis Ball",
        description: "Elevate your tennis game with our high-performance tennis ball. Engineered for consistent bounce and durability, this ball is designed to withstand rigorous play and deliver optimal performance on any court surface. Whether you're honing your skills or engaging in intense matches, our tennis ball is your essential partner for a dynamic and exhilarating tennis experience.",
        count: 10,
        price: 5,
        category: "Sports and Outdoors",
        images: [
            { path: "/images/products/tennisball1.jpg" },
            { path: "/images/products/tennisball2.jpg" },
            { path: "/images/products/tennisball3.jpg" },
        ],
        rating: 3,
        reviewsNumber: 20,
        reviews: [],
        attrs: [
            { key: "color", value: "green" },
            { key: "gear", value: "recreational" },
        ]
    },
    {
        name: "Ancient Tea Pot",
        description: "Indulge in the art of tea brewing with our exquisite teapot. Crafted with precision and elegance, this teapot effortlessly combines form and function. Its ergonomic handle, seamless pour, and heat-retaining design create the perfect tea-drinking experience, making it a must-have addition to your daily ritual.",
        count: 5,
        price: 45,
        category: "Appliances",
        images: [
            { path: "/images/products/teapot1.jpg" },
            { path: "/images/products/teapot2.jpg" },
            { path: "/images/products/teapot3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 17,
        reviews: [],
        attrs: [
            { key: "color", value: "black" },
            { key: "warranty", value: "2 year" },
        ]
    },
    {
        name: "Ancient Tea Cups",
        description: "Immerse yourself in centuries of tradition with our Ancient Tea Cup Set. Inspired by the elegance of bygone eras, each cup is meticulously crafted to reflect the rich heritage of tea culture. Sip your favorite brew from these exquisite cups, designed to enhance the flavors and aromas, and embark on a sensory journey that transcends time. Elevate your tea-drinking experience with this captivating and beautifully curated set.",
        count: 10,
        price: 25,
        category: "Appliances",
        images: [
            { path: "/images/products/teacups1.jpg" },
            { path: "/images/products/teacups2.jpg" },
            { path: "/images/products/teacups3.jpg" },
        ],
        rating: 5,
        reviewsNumber: 17,
        reviews: [],
        attrs: [
            { key: "color", value: "white" },
            { key: "warranty", value: "2 year" },
        ]
    },
]


module.exports = products;