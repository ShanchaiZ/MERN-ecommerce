import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";


// React useState/useEffect Hooks:
import { useState, useEffect } from "react";

// // Used to Logout on Error
// import { useDispatch } from "react-redux"; //Used to Call Redux Actions
// import { logout } from "../../../redux/actions/userActions"; //Used call Logout Action

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {

    // Initial State of the React Hooks
    const [products, setProducts] = useState([]);  // Initially set to empty array of products
    const [productDeleted, setProductDeleted] = useState(false); //Initially set to not Delete Product
    // const dispatch = useDispatch();

    //Product Deletion Handler Alert:
    const deleteHandler = async (productId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteProduct(productId);
            if (data.message === "product removed") {
                setProductDeleted(!productDeleted);
            }
        }
    }

    useEffect(() => {
        const abctrl = new AbortController();
        fetchProducts(abctrl)
            .then((res) => setProducts(res))
            .catch((er) =>
                // dispatch(logout()) // to do: Logout on Error. fix the error
                setProducts([
                    { name: er.response.data.message ? er.response.data.message : er.response.data }
                ])
            );
        return () => abctrl.abort();
    }, [fetchProducts, productDeleted])


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
                        {products.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                {/* Table Edit/ Delete buttons */}
                                <td>
                                    <LinkContainer to={`/admin/edit-product/${item._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item._id)}>
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