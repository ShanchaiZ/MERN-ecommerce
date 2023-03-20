import { Form } from "react-bootstrap";

const RatingFilterComponent = () => {
    return (
        <>
            <span className="fw-Bold">Rating</span>
            <Form.Check type="checkbox" id={`check-api-`}>
                <Form.Check.Input type="checkbox" isValid />
                <Form.Check.Label style={{ cursor: "pointer" }}>Enter Star Rating Here</Form.Check.Label>
            </Form.Check>
        </>
    );
};

export default RatingFilterComponent;