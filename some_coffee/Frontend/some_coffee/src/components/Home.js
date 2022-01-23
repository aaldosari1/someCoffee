import HeroSection from "./HeroSection";
import NavBar1 from "./NavBar1";
import NavBar0 from "./NavBar0";
import "./Home.css";
function Home() {
  return (
    <div>
      <div className="home-nav">
        <NavBar1 />
      </div>
      <div className="home-nav0">
        <NavBar0 />
      </div>
      <div className="home-car">
        <HeroSection />
      </div>
    </div>
  );
}

export default Home;
