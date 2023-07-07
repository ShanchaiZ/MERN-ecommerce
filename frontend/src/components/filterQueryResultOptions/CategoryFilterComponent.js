import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRef } from "react";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {

    const { categories } = useSelector((state) => state.getCategories);
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
            myRefs.current.map((_, idx) => {
                if (!indexesOfMainCategory.includes(idx)) myRefs.current[idx].disabled = true;
                return "";
            })
        } else {
            
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
