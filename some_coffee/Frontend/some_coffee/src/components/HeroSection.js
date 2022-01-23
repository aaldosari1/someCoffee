import Carousel from "react-bootstrap/Carousel";
import "./HeroSection.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

function HeroSection() {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Cup.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="font">Drink it black</h3>
            <p>Relax. Refresh. Recharge.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/beans.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="font">It’s the bean… It’s the grind</h3>
            <p>
              Use premium arabica beans to achieve an undeniably rich,
              flavourful coffee.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/browny.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="font">The dessert you deserve</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default HeroSection;
