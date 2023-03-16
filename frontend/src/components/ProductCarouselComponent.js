import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const ProductCarouselComponent = () => {
    const cursorP = {
        cursor: "pointer"
    }

    return (
        <Carousel>
            {/* Carousel Image 1 */}
            <Carousel.Item className="carousel-img">
                <img
                    crossOrigin="anonymous"
                    className="d-block w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                    src="/images/carousel/carousel-1.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Bestseller In Laptops Category</h3>
                    </LinkContainer>
                    <p>MSI Stealth, 15.9inch HD screen</p>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Carousel Image 2 */}
            <Carousel.Item className="carousel-img">
                <img
                    className="d-block w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                    src="/images/carousel/carousel-2.png"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>


            {/* Carousel Image 3 */}
            <Carousel.Item className="carousel-img">
                <img
                    className="d-block w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                    src="/images/carousel/carousel-3.png"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


export default ProductCarouselComponent;