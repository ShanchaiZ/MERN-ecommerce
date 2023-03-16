import { Card, Button } from "react-bootstrap"

const CategoryCardComponent = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img crossOrigin="anonymous" variant="top" src="/images/electronic-category.jpg" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default CategoryCardComponent;