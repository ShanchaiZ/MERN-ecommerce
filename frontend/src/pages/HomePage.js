import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";

const HomePage = () => {
    // Simulating a database once we have a db connected in the future below:
    const categories = [
        "Tablets",
        "Monitors",
        "Games",
        "Software",
        "Electronics",
        "Books",
        "Videos",
        "Computers"
    ];

    return (
        <>
            <ProductCarouselComponent />
            <Container>
                <Row xs={1} md={2} className="g-4 mt-3">
                    {categories.map((category, idx) => (
                        <CategoryCardComponent key={idx} category={category} idx={idx} />
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default HomePage;