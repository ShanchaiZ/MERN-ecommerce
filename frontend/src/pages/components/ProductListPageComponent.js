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
import { useParams } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {

    // Initial State of the data fields using React Hooks:
    const [products, setProducts] = useState([]); //Initially there will be no products rendered (" the empty array")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [attrsFilter, setAttrsFilter] = useState([]); //Initially attributes are an empty array
    const [attrsFromFilter, setAttrsFromFilter] = useState([]); //Initially attributes on left panel are an empty array
    const [showResetFiltersButton, setShowResetFiltersButton] = useState(false); //Initially set to dont show reset filter button

    const [filters, setFilters] = useState({});
    console.log(filters);

    const { categoryName } = useParams() || "";

    // Used to set attributes from category in db:
    useEffect(() => {
        if (categoryName) {
            let categoryAllData = categories.find((item) => item.name === categoryName.replaceAll(",", "/"));
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0];
                let index = categories.findIndex((item) => item.name === mainCategory);
                setAttrsFilter(categories[index].attrs);
            }
        } else {
            setAttrsFilter([]);
        }
    }, [categoryName, categories])


    // Render Products from database:
    useEffect(() => {
        getProducts()
            .then(products => {
                setProducts(products.products)
                setLoading(false);
            })
            .catch((er) => {
                console.log(er)
                setError(true);
            });
    }, [])

    // Function: display the reset filter button:
    const handleFilters = () => {
        setShowResetFiltersButton(true);
        setFilters({
            attrs: attrsFromFilter
        })
    }

    // Function: dont display reset filter button:
    const resetFilters = () => {
        setShowResetFiltersButton(false);
        setFilters({});
        window.location.href = "/product-list";
    }

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
                        <ListGroup.Item>{<AttributesFilterComponent attrsFilter={attrsFilter} setAttrsFromFilter={setAttrsFromFilter} />}</ListGroup.Item>
                        {/* Filter Buttons */}
                        <ListGroup.Item>
                            <Button variant="primary" onClick={handleFilters}>Filter</Button> {" "}
                            {showResetFiltersButton && (
                                <Button variant="danger" onClick={resetFilters}>Reset Filter</Button>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* Main Product Listing */}
                <Col md={9}>
                    {loading ? (
                        <h1>Loading products ...</h1>
                    ) : error ? (
                        <h1>Error while loading products. Please Try Again Later!</h1>
                    ) : (
                        products.map((product) => (
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
                        ))
                    )}

                    <PaginationComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPageComponent;