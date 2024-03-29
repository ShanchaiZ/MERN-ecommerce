import { Container, Row, Col, Form, Button, CloseButton, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";

import { changeCategory, setValuesForAttrFromDbSelectForm, setAttributesTableWrapper } from "./utils/utils";

const CreateProductPageComponent = ({ createProductApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, categories, reduxDispatch, newCategory, deleteCategory, saveAttributeToCatDoc }) => {

    // REACT local state variables:
    const [validated, setValidated] = useState(false);
    const [attributesTable, setAttributesTable] = useState([]); //Initally the attributes table is an empty array
    const [attributesFromDb, setAttributesFromDb] = useState([]); //Initally the attributes dropdown is an empty array
    const [images, setImages] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const [categoryChosen, setCategoryChosen] = useState("Choose category"); //Initially the dropdown will display "Choose Category" option.

    const [newAttrKey, setNewAttrKey] = useState(false);
    const [newAttrValue, setNewAttrValue] = useState(false); //initally will be used to set the message for entering attribute


    const attrKey = useRef(null);
    const attrVal = useRef(null);
    const createNewAttrKey = useRef(null);
    const createNewAttrVal = useRef(null);

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
                setCategoryChosen(e.target.value);
                element.value = e.target.value;
                e.target.value = "";
            }, 200);
        }
    }

    // Function: Delete Category on X click:
    const deleteCategoryHandler = () => {
        let element = document.getElementById("cats");
        reduxDispatch(deleteCategory(element.value))
        setCategoryChosen("Choose category");
    }

    // Change Attributes Value Handler:
    const attributeValueSelected = (e) => {
        if (e.target.value !== "Choose Attribute Value") {
            setAttributesTableWrapper(attrKey.current.value, e.target.value, setAttributesTable);
        }
    }

    // Function: Delete Attribute from Table:
    const deleteAttribute = (key) => {
        setAttributesTable((table) => table.filter((item) => item.key !== key));
    }

    // Function: Adding Attribute Key when "Enter" pressed:
    const newAttrKeyHandler = (e) => {
        e.preventDefault();
        setNewAttrKey(e.target.value);
        addNewAttributeManually(e);
    }

    // Function: Adding Attribute Value when "Enter" pressed:
    const newAttrValueHandler = (e) => {
        e.preventDefault();
        setNewAttrValue(e.target.value);
        addNewAttributeManually(e);
    }

    // Function: Adding New Attribute Key AND value when "Enter" Pressed
    const addNewAttributeManually = (e) => {
        if (e.keyCode & e.keyCode === 13) {
            if (newAttrKey && newAttrValue) {
                reduxDispatch(saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChosen));
                e.target.value = "";
                createNewAttrKey.current.value = "";
                createNewAttrVal.current.value = "";
                setNewAttrKey(false);
                setNewAttrValue(false);
            }
        }
    }

    // Function: Prevent reloading the page when Pressing the "enter" key:
    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    }

    return (
        <Container className="justified-content-md-content mt-5">
            <Row>
                {/* Create a New Product Form*/}
                <Col md={6}>
                    <h1>Create a New Product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
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
                                <CloseButton onClick={deleteCategoryHandler} />(<small>remove selected</small>)
                            </Form.Label>
                            <Form.Select
                                id="cats"
                                required
                                name="category"
                                aria-label="productCategory"
                                onChange={(e) => changeCategory(e, categories, setAttributesFromDb, setCategoryChosen)}
                            >
                                <option value="">Choose a Category</option>
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

                        {attributesFromDb.length > 0 && (
                            <Row className="mt-5">
                                {/* Choose Category subdivision: Attribute  */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicAttributes">
                                        <Form.Label>Choose Attribute and Set Values</Form.Label>
                                        <Form.Select
                                            name="attrKey"
                                            aria-label="productCategory"
                                            ref={attrKey}
                                            onChange={(e) => setValuesForAttrFromDbSelectForm(e, attrVal, attributesFromDb)}
                                        >
                                            <option>Choose Attribute</option>
                                            {attributesFromDb.map((item, idx) => (
                                                <React.Fragment key={idx}>
                                                    <option value={item.key}>{item.key}</option>
                                                </React.Fragment>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                {/* Choose Category subdivision: Attribute Value  */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                        <Form.Label>Attribute Value</Form.Label>
                                        <Form.Select
                                            name="attrVal"
                                            aria-label="productCategory"
                                            ref={attrVal}
                                            onChange={attributeValueSelected}
                                        >
                                            <option>Choose Attribute Value</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {/* Table for Displaying Attribute, Value and Deletion */}
                        <Row>
                            {attributesTable.length > 0 && (
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attributesTable.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.key}</td>
                                                <td>{item.value}</td>
                                                <td>
                                                    <CloseButton onClick={() => deleteAttribute(item.key)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Row>

                        {/* Create new Attribute and Attribute Value */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create New Attribute</Form.Label>
                                    <Form.Control ref={createNewAttrKey} disabled={["", "Choose category"].includes(categoryChosen)} required={true} placeholder="first choose or create category" name="newAttrValue" type="text" onKeyUp={newAttrKeyHandler} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control ref={createNewAttrVal} disabled={["", "Choose category"].includes(categoryChosen)} placeholder="first choose or create category" required={newAttrKey} name="newAttrValue" type="text" onKeyUp={newAttrValueHandler} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert show={newAttrKey && newAttrValue} variant="primary">After typing attribute key and value, please enter on one of the fields</Alert>

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