import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
    console.log(attrsFilter);

    return (
        <>
            {attrsFilter && attrsFilter.length > 0 && attrsFilter.map((item, idx) => (
                <div key={idx} className="mb-3">
                    {/* 1st Array of Attributes */}
                    <Form.Label>
                        <b>{item.key}</b>
                    </Form.Label>
                    {/* 2nd Array of Attributes */}
                    {item.value.map((item2, idx2) => (
                        <Form.Check key={idx2} type="checkbox" label={item2} onChange={(e) => {
                            setAttrsFromFilter(items => {
                                console.log(item.key);
                            })
                        }} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default AttributesFilterComponent;


