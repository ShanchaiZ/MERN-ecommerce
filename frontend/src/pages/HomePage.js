import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";

const HomePage = () => {
    // Simulating a database once we have a db connected in the future below:
    const categories = [
        "Tablets",
        "Monitors",
        "Games",
        "Software",
        "Books",
        "Videos",
        "Computers"
    ];

    return (
        <>
            <ProductCarouselComponent />
            {
                categories.map(() =>
                    <CategoryCardComponent />)
            }
        </>
    );
};

export default HomePage;