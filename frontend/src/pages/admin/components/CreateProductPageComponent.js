import { Container, Row, Col, Form, Button, CloseButton, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateProductPageComponent = ({ createProductApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, categories, reduxDispatch, newCategory, deleteCategory }) => {

    // REACT local state variables:
    const [validated, setValidated] = useState(false);
    const [attributesTable, setAttributeTable] = useState([]); //Initally the attributes table is an empty array
    const [images, setImages] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const [categoryChosen, setCategoryChosen] = useState("Choose category"); //Initially the dropdown will display "Choose Category" option.

    const navigate = useNavigate();

    // Function: validation function when submit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: form.category.value,
            attributesTable: attributesTable
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 3) {
                setIsCreating("Too Many files for upload!")
                return;
            }
            createProductApiRequest(formInputs)
                .then(data => {
                    if (images) {

                        if (process.env.NODE_ENV !== "production") { // to do: change to !== production
                            uploadImagesApiRequest(images, data.productId)
                                .then(res => { })
                                .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                        } else {
                            uploadImagesCloudinaryApiRequest(images, data.productId);
                        }
                    }
                    if (data.message === "product created") navigate("/admin/products");
                })
                .catch(er => {
                    setCreateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
                })
        }
        setValidated(true);
    };


    // Image Upload Handler:
    const uploadHandler = (images) => {
        setImages(images);
    }

    // Category Handler that Enters Custom Category on pressed "Enter" key: 
    const newCategoryHandler = (e) => {
        if (e.keyCode && e.keyCode === 13 && e.target.value) {
            reduxDispatch(newCategory(e.target.value));
            setTimeout(() => {
                let element = document.getElementById("cats");
                element.value = e.target.value;
                setCategoryChosen(e.target.value);
                e.target.value = "";
            }, 200);
        }
    }

    return (
        <Container className="justified-content-md-content mt-5">
            <Row>
                {/* Create a New Product Form*/}
                <Col md={6}>
                    <h1>Create a New Product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* Name of Product */}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name of Product</Form.Label>
                            <Form.Control name="name" type="text" required />
                        </Form.Group>
                        {/* Product Description */}
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows={3} required />
                        </Form.Group>
                        {/* Product Quantity in Stock */}
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Number of Product in Stock</Form.Label>
                            <Form.Control name="count" type="number" required />
                        </Form.Group>
                        {/* Product Price */}
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="text" required />
                        </Form.Group>
                        {/* Product Category Dropdown */}
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Category
                                <CloseButton />(<small>remove selected</small>)
                            </Form.Label>
                            <Form.Select id="cats" required name="category" aria-label="productCategory">
                                <option value="Choose category">Choose a Category</option>
                                {categories.map((category, idx) => (
                                    <option key={idx} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Add New Catagory */}
                        <Form.Group className="mb-3" controlId="formBasicNewCategory">
                            <Form.Label>or Create A New Category (for example: Computers/Intel/Home Appliances) {" "}</Form.Label>
                            <Form.Control onKeyUp={newCategoryHandler} name="newCategory" type="text" />
                        </Form.Group>
                        <Row className="mt-5">
                            {/* Choose Category subdivision: Attribute  */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Choose Attribute and Set Values</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="productCategory">
                                        <option>Choose Attribute</option>
                                        <option value="color">Color</option>
                                        <option value="shape">Shape</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {/* Choose Category subdivision: Attribute Value  */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="productCategory">
                                        <option>Choose Attribute Value</option>
                                        <option value="1">Red</option>
                                        <option value="2">Yellow</option>
                                        <option value="3">Green</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Table for Displaying Attribute, Value and Deletion */}
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>attr value</td>
                                        <td>
                                            <CloseButton />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>

                        {/* Create new Attribute and Attribute Value */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create New Attribute</Form.Label>
                                    <Form.Control disabled={categoryChosen === "Choose category"} required={true} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control disabled={categoryChosen === "Choose category"} required={true} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert variant="primary">After typing attribute key and value, please enter on one of the fields</Alert>

                        {/* Product Image Upload */}
                        <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="file" multiple required onChange={(e) => uploadHandler(e.target.files)} />
                            {isCreating}
                        </Form.Group>
                        <Button variant="primary" type="submit">Create</Button>
                        {createProductResponseState.error ?? ""}
                    </Form>
                </Col>
                {/* Go Back to Admin Products button */}
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">Go Back </Link>
                </Col>
            </Row>
        </Container>
    )
};

export default CreateProductPageComponent;