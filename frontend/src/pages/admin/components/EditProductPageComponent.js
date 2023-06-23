import { Container, Row, Col, Form, Button, CloseButton, Table, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const onHover = {
    cursor: "pointer",
    position: "absolute",
    right: "3px",
    top: "-15px",
    transform: "scale(1.5)",
}

const EditProductPageComponent = ({ categories, fetchProduct, updateProductApiRequest, reduxDispatch, saveAttributeToCatDoc, imageDeleteHandler, uploadHandler }) => {

    // Initial Local React State:
    const [validated, setValidated] = useState(false); // Initially The form validation is set to false = info not validated
    const [product, setProduct] = useState({}); // Initially product is an empty object
    const [updateProductResponseState, setUpdateProductResponseState] = useState({ message: "", error: "" }); //Initially product responses will be empty strings
    const [attributesFromDb, setAttributesFromDb] = useState([]); //Initally attributes are set to an empty array // this is the attribute select list
    const [attributesTable, setAttributesTable] = useState({}); //initially the attributes table is an empty object // attributes for html table
    const [categoryChosen, setCategoryChosen] = useState("Choose Category"); //Initally in Category dropdown Attribute is set to "Choose Category"
    const [newAttrKey, setNewAttrKey] = useState(false);
    const [newAttrValue, setNewAttrValue] = useState(false);
    const [imageRemoved, setImageRemoved] = useState(false);// Initially the image is not removed.
    const [isUploading, setIsUploading] = useState(""); // Initially array of an image is empty.
    const [imageUploaded, setImageUploaded] = useState(false);//Initally there is no image to upload.


    const attrKey = useRef(null);
    const attrVal = useRef(null);
    const createNewAttrKey = useRef(null);
    const createNewAttrVal = useRef(null);

    const setValuesForAttrFromDbSelectForm = (e) => {
        if (e.target.value !== "Choose Attribute") {
            var selectedAttr = attributesFromDb.find((item) => item.key === e.target.value);
            let valuesForAttrKeys = attrVal.current;
            if (selectedAttr && selectedAttr.value.length > 0) {
                // clear all previous values to make space for new attribute values:
                while (valuesForAttrKeys.options.length) {
                    valuesForAttrKeys.remove(0);
                }
                valuesForAttrKeys.options.add(new Option("Choose Attribute Value"));
                selectedAttr.value.map(item => {
                    valuesForAttrKeys.add(new Option(item));
                    return "";
                })
            }
        }
    }


    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct(id)
            .then((product) => setProduct(product))
            .catch((er) => console.log(er));
    }, [id, imageRemoved, imageUploaded]);

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
            updateProductApiRequest(id, formInputs)
                .then(data => {
                    if (data.message === "product updated") navigate("/admin/products")
                })
                .catch((er) => setUpdateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }));
        }
        setValidated(true);
    };


    //Display Main Category of the Edited Products:
    useEffect(() => {
        let categoryOfEditedProduct = categories.find((item) => item.name === product.category);
        if (categoryOfEditedProduct) {
            const mainCategoryOfEditedProduct = categoryOfEditedProduct.name.split("/")[0];

            // Fetch all the category data with respect to the product:
            const mainCategoryOfEditedProductAllData = categories.find((categoryOfEditedProduct) => categoryOfEditedProduct.name === mainCategoryOfEditedProduct);
            if (mainCategoryOfEditedProductAllData && mainCategoryOfEditedProductAllData.attrs.length > 0) {
                setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
            }
        }
        setCategoryChosen(product.category);
        setAttributesTable(product.attrs);
    }, [product])


    // Change Category Handler:
    const changeCategory = (e) => {
        const highLevelCategory = e.target.value.split("/")[0];
        const highLevelCategoryAllData = categories.find((cat) => cat.name === highLevelCategory);
        if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
            setAttributesFromDb(highLevelCategoryAllData.attrs);
        } else {
            setAttributesFromDb([]);
        }
        setCategoryChosen(e.target.value);
    }

    // Change Attributes Value Handler:
    const attributeValueSelected = (e) => {
        if (e.target.value !== "Choose Attribute Value") {
            setAttributesTableWrapper(attrKey.current.value, e.target.value);
        }
    }

    // Function: Dynamically update and Save Attribute Value in Attributes Table: 
    const setAttributesTableWrapper = (key, val) => {
        setAttributesTable((attr) => {
            if (attr.length !== 0) {
                var keyExistsInOldTable = false;
                let modifiedTable = attr.map(item => {
                    if (item.key === key) {
                        keyExistsInOldTable = true;
                        item.value = val;
                        return item;
                    } else {
                        return item;
                    }
                })
                if (keyExistsInOldTable) return [...modifiedTable];
                else return [...modifiedTable, { key: key, value: val }]
            } else {
                return [{ key: key, value: val }]
            }
        })
    }

    // Function: Delete Attribute from Table:
    const deleteAttribute = (key) => {
        setAttributesTable((table) => table.filter((item) => item.key !== key));
    }

    // Function: Prevent Submitting form before adding attribute using the "Enter" Key:
    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    }

    // Function: Adding Attribute Key when "Enter" pressed
    const newAttrKeyHandler = (e) => {
        e.preventDefault();
        setNewAttrKey(e.target.value);
        addNewAttributeManually(e);
    }

    // Function: Adding Attribute Value when "Enter" pressed
    const newAttrValueHandler = (e) => {
        e.preventDefault();
        setNewAttrValue(e.target.value);
        addNewAttributeManually(e);
    }

    // Function: Adding Attribute Key AND value when "Enter" Pressed
    const addNewAttributeManually = (e) => {
        if (e.keyCode && e.keyCode === 13) {
            if (newAttrKey && newAttrValue) {
                reduxDispatch(saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChosen));
                setAttributesTableWrapper(newAttrKey, newAttrValue);
                e.target.value = "";
                createNewAttrKey.current.value = "";
                createNewAttrVal.current.value = "";
                setNewAttrKey(false);
                setNewAttrValue(false);
            }
        }
    }

    return (
        <Container className="justified-content-md-content mt-5">
            <Row>
                {/* Edit Product Form*/}
                <Col md={6}>
                    <h1>Edit A Product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
                        {/* Name of Product */}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name of Product</Form.Label>
                            <Form.Control name="name" type="text" required defaultValue={product.name} />
                        </Form.Group>
                        {/* Product Description */}
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows={3} required defaultValue={product.description} />
                        </Form.Group>
                        {/* Product Quantity in Stock */}
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Number of Product in Stock</Form.Label>
                            <Form.Control name="count" type="number" required defaultValue={product.count} />
                        </Form.Group>
                        {/* Product Price */}
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="text" required defaultValue={product.price} />
                        </Form.Group>
                        {/* Product Category Dropdown */}
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select required name="category" aria-label="productCategory" onChange={changeCategory}>
                                <option value="Choose Category">Choose Category</option>
                                {categories.map((category, idx) => {
                                    return product.category === category.name ? (
                                        <option selected key={idx} value={category.name}>
                                            {category.name}
                                        </option>
                                    ) : (
                                        <option key={idx} value={category.name}>
                                            {category.name}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        {attributesFromDb.length > 0 && (
                            <Row className="mt-5">
                                {/* Choose Category subdivision: Attribute  */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicAttributes">
                                        <Form.Label>Choose Attribute and Set Values</Form.Label>
                                        <Form.Select
                                            name="atrrKey"
                                            aria-label="productCategory"
                                            ref={attrKey}
                                            onChange={setValuesForAttrFromDbSelectForm}
                                        >
                                            <option>Choose Attribute</option>
                                            {attributesFromDb.map((item, idx) => (
                                                <Fragment key={idx}>
                                                    <option value={item.key}>{item.key}</option>
                                                </Fragment>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                {/* Choose Category subdivision: Attribute Value  */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                        <Form.Label>Attribute Value</Form.Label>
                                        <Form.Select name="atrrVal" aria-label="productCategory" ref={attrVal} onChange={attributeValueSelected}>
                                            <option>Choose Attribute Value</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                        )}

                        {/* Table for Displaying Attribute, Value and Deletion */}
                        <Row>
                            {attributesTable && attributesTable.length > 0 && (
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
                                    <Form.Control
                                        ref={createNewAttrKey}
                                        disabled={categoryChosen === "Choose Category"}
                                        placeholder="first choose or create category"
                                        name="newAttrKey"
                                        type="text"
                                        onKeyUp={newAttrKeyHandler}
                                        required={newAttrValue} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control
                                        ref={createNewAttrVal}
                                        disabled={categoryChosen === "Choose Category"}
                                        placeholder="first choose or create category"
                                        name="newAttrValue"
                                        type="text"
                                        onKeyUp={newAttrValueHandler}
                                        required={newAttrKey} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert show={newAttrKey && newAttrValue} variant="primary">
                            After typing attribute key and value, please press "Enter" on one of the fields
                        </Alert>

                        {/* Product Image Upload */}
                        <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                            <Form.Label>Images</Form.Label>
                            <Row>
                                {product.images && product.images.map((image, idx) => (
                                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                                        <Image crossOrigin="anonymous" src={image.path ?? null} fluid />
                                        <i style={onHover}
                                            onClick={() => imageDeleteHandler(image.path, id).then(data => setImageRemoved(!imageRemoved))}
                                            className="bi bi-x-circle text-danger"></i>
                                    </Col>
                                ))}
                            </Row>

                            {/* Image Upload attachment */}
                            <Form.Control required type="file" multiple onChange={e => {
                                setIsUploading("File upload in progress ... ");
                                uploadHandler(e.target.files, id)
                                    .then(data => {
                                        setIsUploading("File upload completed");
                                        setImageUploaded(!imageUploaded);
                                    })
                                    .catch((er) => setIsUploading(er.response.data.message ? er.response.data.message : er.message.data));
                            }} />
                            {isUploading}
                            
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                        {updateProductResponseState.error ?? ""}
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

export default EditProductPageComponent;