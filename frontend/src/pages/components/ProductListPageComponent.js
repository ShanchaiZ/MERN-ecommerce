import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

// Page Components:
import PaginationComponent from "../../components/PaginationComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import ProductForListComponent from "../../components/ProductForListComponent";

//Product Query Results Filtering Components:
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";


import { useState, useEffect } from "react";

const ProductListPageComponent = ({ getProducts }) => {

    // Initial State of the data fields using React Hooks:
    const [products, setProducts] = useState([]); //Initially there will be no products rendered (" the empty array")


    useEffect(() => {
        getProducts()
            .then(products => setProducts(products.products))
            .catch((er) => console.log(er));
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    {/* Product Filter Query Features */}
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mb-3 mt-3">{<SortOptionsComponent />}</ListGroup.Item>
                        <ListGroup.Item>Filter: <br />{<PriceFilterComponent />}</ListGroup.Item>
                        <ListGroup.Item>{<RatingFilterComponent />}</ListGroup.Item>
                        <ListGroup.Item>{<CategoryFilterComponent />}</ListGroup.Item>
                        <ListGroup.Item>{<AttributesFilterComponent />}</ListGroup.Item>
                        {/* Filter Buttons */}
                        <ListGroup.Item>
                            <Button variant="primary">Filter</Button> {" "}
                            <Button variant="danger">Reset Filter</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* Main Product Listing */}
                <Col md={9}>
                    {products.map((product) => (
                        <ProductForListComponent
                            key={product._id}
                            images={product.images}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            rating={product.rating}
                            reviewsNumber={product.reviewsNumber}
                            productId={product._id}
                        />
                    ))};
                    <PaginationComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPageComponent;