import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";


// React useState/useEffect Hooks:
import { useState, useEffect } from "react";

//Product Deletion Handler Alert:
const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
        alert("Product Deleted!")
    }
}

const ProductsPageComponent = ({ fetchProducts }) => {

    // Initial State of the React Hooks
    const [products, setProducts] = useState([]);  // Initially set to empty array of products

    useEffect(() => {
        const abctrl = new AbortController();
        fetchProducts(abctrl)
            .then((res) => setProducts(res))
            .catch(error => console.log({ error: error.message }));
            // .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data));
        return () => abctrl.abort();
    }, [fetchProducts])


    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            <Col md={10}>
                <h1>
                    Product List {" "}
                    <LinkContainer to="/admin/create-new-product">
                        <Button variant="primary">Create New</Button>
                    </LinkContainer>
                </h1>
                {/* Bootstrap Tables */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* TABLE HEADERS */}
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: "Toshiba", price: "$420", category: "TV" },
                            { name: "LG", price: "$999", category: "Tablet" },
                            { name: "Lenovo", price: "$1520", category: "Computer" },
                        ].map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                {/* Table Edit/ Delete buttons */}
                                <td>
                                    <LinkContainer to="/admin/edit-product">
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>
        </Row >
    )
};

export default ProductsPageComponent;