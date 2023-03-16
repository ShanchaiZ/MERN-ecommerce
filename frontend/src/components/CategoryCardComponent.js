import { Card, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ category, idx }) => {
    const images = [
        "/images/category/tablets-category.jpg",
        "/images/category/monitors-category.jpg",
        "/images/category/games-category.jpg",
        "/images/category/software-category.jpg",
        "/images/category/electronics-category.jpg",
        "/images/category/books-category.jpg",
        "/images/category/videos-category.jpg",
        "/images/category/computers-category.jpg",
    ];

    return (
        <Card>
            <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
            <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <LinkContainer to="/product-list">
                    <Button variant="primary">Go to Category</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default CategoryCardComponent;