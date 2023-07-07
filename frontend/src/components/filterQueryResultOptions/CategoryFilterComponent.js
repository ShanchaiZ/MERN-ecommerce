import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {

    const { categories } = useSelector((state) => state.getCategories);
    const [selectedCategories, setSelectedCategories] = useState([]); //Inital state is empty array of Selected Categories
    const myRefs = useRef([]);

    // Function: checked category box will return the checked value
    const selectCategory = (e, category, idx) => {
        setCategoriesFromFilter(items => {
            return { ...items, [category.name]: e.target.checked };
        })

        var selectedMainCategory = category.name.split("/")[0];
        var allCategories = myRefs.current.map((_, id) => {
            return { name: categories[id].name, idx: id };
        })
        var indexesOfMainCategory = allCategories.reduce((acc, item) => {
            var cat = item.name.split("/")[0];
            if (selectedMainCategory === cat) {
                acc.push(item.idx);
            }
            return acc;
        }, [])
        // If a Category attribute is checked then disable the other categories:
        if (e.target.checked) {
            setSelectedCategories((old) => [...old, "cat"])
            myRefs.current.map((_, idx) => {
                if (!indexesOfMainCategory.includes(idx)) myRefs.current[idx].disabled = true;
                return "";
            })
        } else {
            //Otherwise: there is no products to be filtered and all products are found on /product-list page:
            setSelectedCategories((old) => {
                var a = [...old];
                a.pop();
                if (a.length === 0) {
                    window.location.href = "/product-list";
                }
                return a;
            })
        }
    };

    return (
        <>
            <span className="fw-bold">Category</span>
            <Form>
                {categories.map((category, idx) => (
                    <div key={idx}>
                        <Form.Check type="checkbox" id={`check-api2-${idx}`}>
                            <Form.Check.Input
                                ref={(el) => (myRefs.current[idx] = el)}
                                type="checkbox"
                                isValid
                                onChange={(e) =>
                                    selectCategory(e, category, idx)
                                } />
                            <Form.Check.Label style={{ cursor: "pointer" }}>{category.name}</Form.Check.Label>
                        </Form.Check>
                    </div>
                ))}
            </Form>
        </>
    );
};

export default CategoryFilterComponent;
