import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({ showCartMessage, setShowCartMessage }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); //Navigate (-1) = go back to previous page
    }

    return (
        <Alert show={showCartMessage} variant="success" onClose={() => setShowCartMessage(false)} dismissible>
            <Alert.Heading>The product was added to your cart for purchase! Thank you for Shoptimizing!</Alert.Heading>
            <p>
                <Button variant="success" onClick={goBack}>Go Back</Button>{" "}
                <Link to="/cart">
                    <Button variant="danger">Go to Cart</Button>
                </Link>
            </p>
        </Alert>
    );
}

export default AddedToCartMessageComponent;