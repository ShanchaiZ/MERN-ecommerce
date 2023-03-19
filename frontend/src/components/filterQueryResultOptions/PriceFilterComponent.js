import { Form } from "react-bootstrap";

const PriceFilterComponent = () => {
    return (
        <>
            <Form.Label>Price no greater than:</Form.Label>
            <Form.Range />
        </>
    );
};

export default PriceFilterComponent;