import { Form } from "react-bootstrap";

const SortOptionsComponent = ({ setSortOption }) => {
    return (
        <Form.Select onChange={(e) => setSortOption(e.target.value)} aria-label="Default select example">
            <option>Sort By</option>
            <option value="price_1">Price: Low to High</option>
            <option value="price_-1">Price: High to Low</option>
            <option value="rating_-1">Customer Rating</option>
            <option value="name_1">Alphabetical (A-Z)</option>
            <option value="name_-1">Reverse Alphabetical (Z-A)</option>
        </Form.Select>
    );
}

export default SortOptionsComponent;