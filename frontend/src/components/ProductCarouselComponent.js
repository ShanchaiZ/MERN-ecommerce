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
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Bestseller In Books Category</h3>
                    </LinkContainer>
                    <p>Picture of Dorian Gray - Oscar Wilde; in mint condition</p>
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
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Bestseller in Cameras</h3>
                    </LinkContainer>
                    <p>4k HD Video Camcorder with YouTube Upload </p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    );
}


export default ProductCarouselComponent;