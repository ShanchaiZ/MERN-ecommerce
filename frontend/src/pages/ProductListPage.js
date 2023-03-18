import PaginationComponent from "../components/PaginationComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";
import ProductForListComponent from "../components/ProductForListComponent";

const ProductListPage = () => {
    return (
        <>
            <ProductForListComponent />
            <SortOptionsComponent />
            <PaginationComponent />
        </>

    )
};

export default ProductListPage;