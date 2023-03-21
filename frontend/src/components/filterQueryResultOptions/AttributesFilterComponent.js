import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
    return (
        <>
            {[{ color: ["red", "blue", "green"] }, { ram: ["1 TB", "2 TB", "3 TB"] }].map((item, idx) => (
                <div key={idx} className="mb-3">
                    <Form.Label><b>{Object.keys(item)}</b></Form.Label>
                    <Form.Check type="checkbox" id="default-checkbox" label="red" />
                </div>
            ))}

        </>
    );
};

export default AttributesFilterComponent;


