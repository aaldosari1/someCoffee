import Carousel from "react-bootstrap/Carousel";
import "./HeroSection.css";
import "bootstrap/dist/css/bootstrap.min.css";

function HeroSection() {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/pic62.jpg"
            alt="First slide"
          />
          <Carousel.Caption bsPrefix="hero-txt">
            <h3 className="font">For the customer who knows what they want</h3>
            <p className="font">
              Brewed with precision for a great tasting cup.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/beans.jpg"
            alt="Second slide"
          />

          <Carousel.Caption bsPrefix="hero-txt-1">
            <h3 className="font">It’s the bean… It’s the grind</h3>
            <p className="font">
              Use premium arabica beans to achieve an undeniably rich,
              flavourful coffee.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Cup.jpg"
            alt="Third slide"
          />

          <Carousel.Caption bsPrefix="hero-txt">
            <h3 className="font">Drink it black</h3>
            <p className="font">Relax. Refresh. Recharge.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default HeroSection;
