const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
    try {

        // Variable used to for Filtering Products:
        let query = {};
        let queryCondition = false;

        // Filtering for Price:
        let priceQueryCondition = {};
        if (req.query.price) {
            queryCondition = true;
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        // Filtering for Rating:
        let RatingQueryCondition = {};
        if (req.query.rating) {
            queryCondition = true;
            RatingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        // Logic used to Get Product from Specific Category using Search Bar:
        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || "";
        if (categoryName) {
            queryCondition = true;
            let a = categoryName.replaceAll(",", "/");
            var regEx = new RegExp("^" + a); // this expression created forward slashes with regExp in the slash => /^a/ and carrot sign => begining of string
            categoryQueryCondition = { category: regEx }
        }

        // Logic used to Get Product from Specific Category using the filtering feature on page:
        if (req.query.category) {
            queryCondition = true;
            let a = req.query.category.split(",").map((item) => {
                if (item) return regEx = new RegExp("^" + item);
            })
            categoryQueryCondition = {
                category: { $in: a }
            }
        }


        // Logic used to Get Product by Filtering Through Attribute on page:
        let attrsQueryCondition = [];
        if (req.query.attrs) {
            // In attrs array, RAM = key and 1TB = value. RAM-1TB-2TB-3TB, color-blue-red
            // [RAM-1TB-2TB-3TB, color-blue-red]
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-"); //OUTPUT: 2 attributes arrays of key and values of [ 'RAM', '1TB', '2TB', '3TB' ] and [ ' color', 'blue', 'red' ]
                    let values = [...a];// Same output of 2 attributes arrays of key and values of [ 'RAM', '1TB', '2TB', '3TB' ] and [ ' color', 'blue', 'red' ]
                    values.shift(); // removes first item in each array. left with ['1TB', '2TB', '3TB' ] and [ 'blue', 'red' ]
                    let a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values } } } //makes it so we only want products that only have those attributes
                    }
                    acc.push(a1); //initially the accumulator 'acc' is empty => .push a1 onto it and need to return for .reduce to work
                    // console.dir(acc, { depth: null });
                    return acc;
                } else return acc;
            }, []);
            // console.dir(attrsQueryCondition, { depth: null });
            queryCondition = true;
        }

        // Logic used Get Products by Searching in Search Bar:
        const searchQuery = req.params.searchQuery || "";
        let searchQueryCondition = {};
        if (searchQuery) {
            queryCondition = true;
            searchQueryCondition = { $text: { $search: searchQuery } }
        }

        // If there is a Query to filter requests:..
        if (queryCondition) {
            //... then Combining the Price AND rating Operator:
            query = {
                $and: [priceQueryCondition, RatingQueryCondition, categoryQueryCondition, searchQueryCondition, ...attrsQueryCondition]
            }
        }


        // Variable used for Pagination and Sorting Products:
        const pageNum = Number(req.query.pageNum) || 1; //number inputted by user or by default set to 1.


        // Dynamic Sorting of Product by other fields instead of static ascending order:
        let sort = {};
        const sortOption = req.query.sort || "";
        if (sortOption) {
            let sortOpt = sortOption.split("_");
            sort = { [sortOpt[0]]: Number(sortOpt[1]) };
            console.log(sort);
        }




        const totalProducts = await Product.countDocuments(query); //provides a total count of all products in a database.
        const products = await Product.find(query) //finds all products in the db hence the empty {}
            .sort(sort)//instead of static "asc" string to sort in name in ascending order, 1 also works(Note: -1 = descending order). 
            .limit(recordsPerPage) //limits the amount of product results that can be displayed; used for pagination
            .skip(recordsPerPage * (pageNum - 1)); //skips over the number of records in the argument and displays results after the skipped number indicated by recordsPerPage

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) // Take the upper limit of number of all the products in a database and divide by the recordsPerPage number which results in number of product links that can be displayed on a page.
        });
    } catch (error) {
        next(error)
    }
};

module.exports = getProducts;