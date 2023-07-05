import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
    // console.log(attrsFilter);

    return (
        <>
            {attrsFilter && attrsFilter.length > 0 && attrsFilter.map((filter, idx) => (
                <div key={idx} className="mb-3">
                    {/* 1st Array of Attributes */}
                    <Form.Label>
                        <b>{filter.key}</b>
                    </Form.Label>
                    {/* 2nd Array of Attributes */}
                    {filter.value.map((valueForKey, idx2) => (
                        <Form.Check key={idx2} type="checkbox" label={valueForKey} onChange={(e) => {
                            setAttrsFromFilter(filters => {
                                if (filters.length === 0) {
                                    return [{ key: filter.key, values: [valueForKey] }]
                                }

                                let index = filters.findIndex((item) => item.key === filter.key);
                                if (index === -1) {
                                    //if index not found (if clicked key is not found in the attribute filters)
                                    return [...filters, { key: filter.key, values: [valueForKey] }]
                                }

                                // if index is found (if clicked key is found in the attribute filters and is checked)
                                if (e.target.checked) {
                                    filters[index].values.push(valueForKey);
                                    let unique = [...new Set(filters[index].values)];
                                    filters[index].values = unique;
                                    return [...filters];
                                }

                                //if clicked key is inside filters and unchecked:
                                let valuesWithoutUnChecked = filters[index].values.filter((val) => val !== valueForKey);
                                filters[index].values = valuesWithoutUnChecked;
                                if (valuesWithoutUnChecked > 0) {
                                    return [...filters];
                                } else {
                                    let filterWithoutOneKey = filters.filter((item) => item.key !== filter.key);
                                    return [...filterWithoutOneKey];
                                }

                            })
                        }} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default AttributesFilterComponent;


