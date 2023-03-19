import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";
import ProductForListComponent from "../components/ProductForListComponent";

import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";


const ProductListPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    {/* Buttons */}
                    <ListGroup.Item>
                        <Button variant="primary">Primary</Button>
                        <Button variant="danger">Danger</Button>
                    </ListGroup.Item>
                </Col>
            </Row>
        </Container>


    );
};

export default ProductListPage;

{/* <>
<AttributesFilterComponent />
<CategoryFilterComponent />
<PriceFilterComponent />
<RatingFilterComponent />

<ProductForListComponent />
<SortOptionsComponent />
<PaginationComponent />
</> */}