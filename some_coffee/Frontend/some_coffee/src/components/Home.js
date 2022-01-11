import HeroSection from "./HeroSection";
import "./Home.css";
function Home() {
  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url("./Images/coffee-cup.jpg)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <HeroSection />
      </div>
    </>
  );
}

export default Home;
