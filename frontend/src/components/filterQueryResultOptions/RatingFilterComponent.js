import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const RatingFilterComponent = () => {
    return (
        <>
            <span className="fw-Bold"><b>Rating</b></span>
            <Form.Check type="checkbox" id={`check-api-`}>
                <Form.Check.Input type="checkbox" isValid />
                <Form.Check.Label style={{ cursor: "pointer" }}>
                    {/* Star Rating Filter: read only */}
                    {<Rating readonly size={20} initialValue={5} />}
                </Form.Check.Label>
            </Form.Check>
        </>
    );
};

export default RatingFilterComponent;