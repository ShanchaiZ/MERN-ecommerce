import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Row } from "react-bootstrap";

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
            <Row xs={1} md={2} className="g-4">
                {categories.map(() => (
                    <CategoryCardComponent />
                ))}
            </Row>
        </>
    );
};

export default HomePage;