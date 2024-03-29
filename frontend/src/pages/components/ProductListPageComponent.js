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
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {

    // Initial State of the data fields using React Hooks:
    const [products, setProducts] = useState([]); //Initially there will be no products rendered (" the empty array")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [attrsFilter, setAttrsFilter] = useState([]); //Initially attributes are an empty array. used to Collect Category Attributes from database and show on webpage.
    const [attrsFromFilter, setAttrsFromFilter] = useState([]); //Initially attributes on left panel are an empty array.  Used to collect user Filters for category attributes.
    const [showResetFiltersButton, setShowResetFiltersButton] = useState(false); //Initially set to dont show reset filter button

    const [filters, setFilters] = useState({}); //Initially Filters are set to an empty array. used to Collect ALL filters
    const [price, setPrice] = useState(500); // Initally the Price is set to 500
    const [ratingsFromFilter, setRatingsFromFilter] = useState({}); //Initially ratings are empty object
    const [categoriesFromFilter, setCategoriesFromFilter] = useState({}); //initially category attributes are empty object
    const [sortOption, setSortOption] = useState("");
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
    const [pageNum, setPageNum] = useState(null);

    const { categoryName } = useParams() || "";
    const { pageNumParam } = useParams() || 1;
    const { searchQuery } = useParams() || "";

    const location = useLocation();
    const navigate = useNavigate();

    // Used to set attributes from category in db:
    useEffect(() => {
        if (categoryName) {
            let categoryAllData = categories.find((item) => item.name === categoryName.replace(/, /g, "/"));
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0];
                let index = categories.findIndex((item) => item.name === mainCategory);
                setAttrsFilter(categories[index].attrs);
            }
        } else {
            setAttrsFilter([]);
        }
    }, [categoryName, categories])


    // Fetching Attributes associated with Main Categories and displaying it on page:
    useEffect(() => {
        if (Object.entries(categoriesFromFilter).length > 0) {
            setAttrsFilter([]);
            var cat = [];
            var count;
            Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
                if (checked) {
                    var name = category.split("/")[0];
                    cat.push(name);
                    count = cat.filter((x) => x === name).length;
                    if (count === 1) {
                        var index = categories.findIndex((item) => item.name === name);
                        setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
                    }
                }
            })
        }
    }, [categoriesFromFilter, categories])


    // Render List of Products from database/ Product Listing used in Pagination:
    useEffect(() => {
        getProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
            .then(products => {
                setProducts(products.products);
                setPaginationLinksNumber(products.paginationLinksNumber);
                setPageNum(products.pageNum);
                setLoading(false);
            })
            .catch((er) => {
                console.log(er)
                setError(true);
            });
    }, [categoryName, pageNumParam, searchQuery, filters, sortOption])

    // Function: display the reset filter button:
    const handleFilters = () => {
        navigate(location.pathname.replace(/\/[0-9]+$/, ""));
        setShowResetFiltersButton(true);
        setFilters({
            price: price,
            rating: ratingsFromFilter,
            category: categoriesFromFilter,
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
                        <ListGroup.Item className="mb-3 mt-3">{<SortOptionsComponent setSortOption={setSortOption} />}</ListGroup.Item>
                        <ListGroup.Item>Filter: <br />{<PriceFilterComponent price={price} setPrice={setPrice} />}</ListGroup.Item>
                        <ListGroup.Item>{<RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter} />}</ListGroup.Item>
                        {!location.pathname.match(/\/category/) && (
                            <ListGroup.Item>{<CategoryFilterComponent setCategoriesFromFilter={setCategoriesFromFilter} />}</ListGroup.Item>
                        )}
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
                    {paginationLinksNumber > 1 ? (
                        <PaginationComponent
                            categoryName={categoryName}
                            searchQuery={searchQuery}
                            paginationLinksNumber={paginationLinksNumber}
                            pageNum={pageNum}
                        />
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPageComponent;