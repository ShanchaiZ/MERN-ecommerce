import ProductListPageComponent from "./components/ProductListPageComponent";

// Axios used to make API calls:
import axios from "axios";

import { useSelector } from "react-redux";

let filtersUrl = "";


// Function: Search Query Filter
const proceedFilters = (filters) => {
    filtersUrl = "";
    Object.keys(filters).map((key, index) => {

        // Search Query filter for price:
        if (key === "price") filtersUrl += `&price=${filters[key]}`;

        // Search Query filter for rating:
        else if (key === "rating") {
            let rat = "";
            Object.keys(filters[key]).map((key2, index2) => {
                if (filters[key][key2]) rat += `${key2},`;
                return "";
            })
            filtersUrl += "&rating=" + rat;
        }

        // Search Query filter for category:
        else if (key === "category") {
            let cat = "";
            Object.keys(filters[key]).map((key3, index3) => {
                if (filters[key][key3]) cat += `${key3},`;
                return "";
            })

            filtersUrl += "&category=" + cat;

            // Search Query filter for attributes:
        } else if (key === "attrs") {
            if (filters[key].length > 0) {
                let val = filters[key].reduce((acc, item) => {
                    let key = item.key;
                    let val = item.values.join("-");
                    return acc + key + "-" + val + ",";
                }, "")
                filtersUrl += "&attrs=" + val;
            }
        }
        return "";
    })
    return filtersUrl;
}


// Get List of ALL Products in database + update along with pagination and pageNumber Display:
const getProducts = async (categoryName = "", pageNumParam = null, searchQuery = "", filters = {}, sortOption = "") => {

    // This is the example of url string used to search a query: where each section is a search property:
    // filtersUrl = "&price=60&rating=1,2,3&category=a,b,c&attrs=color-red-green,size-1TB-2TB"; (full search query string)
    //      filtersUrl = "&price=60
    //                          &rating=1, 2, 3
    //                                  &category=a, b, c
    //                                       &attrs=color-red-green, size-1TB-2TB";

    filtersUrl = proceedFilters(filters); //made from the function defined above
    const search = searchQuery ? `search/${searchQuery}` : "";
    const category = categoryName ? `category/${categoryName}/` : "";
    const url = `/api/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`
    const { data } = await axios.get(url);
    return data;
}


const ProductListPage = () => {

    const { categories } = useSelector((state) => state.getCategories);

    return <ProductListPageComponent getProducts={getProducts} categories={categories} />
};

export default ProductListPage;