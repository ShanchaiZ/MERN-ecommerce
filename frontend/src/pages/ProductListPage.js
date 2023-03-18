import PaginationComponent from "../components/PaginationComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";
import ProductForListComponent from "../components/ProductForListComponent";

import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";


const ProductListPage = () => {
    return (
        <>
            <AttributesFilterComponent />
            <CategoryFilterComponent />
            <PriceFilterComponent />
            <RatingFilterComponent />

            <ProductForListComponent />
            <SortOptionsComponent />
            <PaginationComponent />
        </>

    )
};

export default ProductListPage;