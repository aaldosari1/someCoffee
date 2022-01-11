import "./Menu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const items = [
    {
      img: "MenuImages/Blonde Roast.jpg",
      name: "Blonde Roast",
      cat: "hot",
      id: 1,
    },
    {
      img: "MenuImages/Caffe Americano.jpg",
      name: "Caffe Americano",
      cat: "hot",
      id: 2,
    },
    {
      img: "MenuImages/Caffe Misto.jpg",
      name: "Caffe Misto",
      cat: "hot",
      id: 3,
    },
    { img: "MenuImages/Cappuccino.jpg", name: "Cappuccino", cat: "hot", id: 4 },
    {
      img: "MenuImages/Caramel Apple Spice.jpg",
      name: "Caramel Apple Spice",
      cat: "hot",
      id: 5,
    },
    { img: "MenuImages/Chai Tea.jpg", name: "Chai Tea", cat: "hot", id: 6 },
    {
      img: "MenuImages/Cold Brew Coffee.jpg",
      name: "Cold Brew",
      cat: "cold",
      id: 7,
    },
    { img: "MenuImages/Cold Brew.jpg", name: "Cold Brew", cat: "cold", id: 8 },
    {
      img: "MenuImages/Honey Almondmilk Cold Brew.jpg",
      name: "Honey Almondmilk",
      cat: "cold",
      id: 9,
    },
    {
      img: "MenuImages/Iced Chocolate Almondmilk Shaken Espresso.jpg",
      name: "Chocolate Almondmilk",
      cat: "cold",
      id: 10,
    },
    {
      img: "MenuImages/Iced Shaken Espresso.jpg",
      name: "Iced Shaken Espresso",
      cat: "cold",
      id: 11,
    },
    {
      img: "MenuImages/Irish Cream Cold Brew.jpg",
      name: "Irish Cream",
      cat: "cold",
      id: 12,
    },
    {
      img: "MenuImages/Pumpkin Cream Cold Brew.jpg",
      name: "Pumpkin Cream Cold",
      cat: "cold",
      id: 13,
    },
    {
      img: "MenuImages/Steamed Apple Juice.jpg",
      name: "Steamed Apple Juice",
      cat: "hot",
      id: 14,
    },
    {
      img: "MenuImages/Vanilla Sweet Cream Cold Brew.jpg",
      name: "Vanilla Sweet Cream",
      cat: "cold",
      id: 15,
    },
  ];
  const navigate = useNavigate();
  const details = () => {
    navigate("/MenuDetails");
  };

  const [products, setProducts] = useState([]);
  const [myBool, setmyBool] = useState(false);

  const toggle = () => {
    setmyBool(true);
  };
  const toggle2 = () => {
    setmyBool(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="menu-container">
      <h1>Menu page</h1>
      <hr />
      <div className="myDiv">
        <div className="Menu">
          <ul>
            <li>
              <h4>Drinks</h4>
            </li>
            <li>
              <a href="#Hot coffee" onClick={toggle}>
                Hot
              </a>
            </li>

            <li>
              <a href="#Iced Tea" onClick={toggle2}>
                Iced
              </a>
            </li>

            <li>
              <h4>Cake</h4>
            </li>
            <li>
              <a href="#Iced Tea">Cheese Cake</a>
            </li>
            <li>
              <a href="#Iced Tea">Chocolote Cake</a>
            </li>
          </ul>
        </div>

        {myBool ? (
          <>
            <div className="menu-imgs">
              {items.map((element) => {
                if (element.cat === "hot") {
                  return (
                    <div>
                      <Link to={`/MenuDetails/${element.id}`}>
                        <img src={element.img} />
                        <h5> {element.name} </h5>
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
          </>
        ) : (
          <div className="menu-imgs">
            {items.map((element) => {
              if (element.cat === "cold") {
                return (
                  <div>
                    <Link to={`/MenuDetails/${element.id}`}>
                      <img src={element.img} />
                      <h5> {element.name} </h5>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        )}
        {/* <div className="menu-imgs">
          {items.map((element) => {
            if (element.img) {
              return <img src={element.img} />;
            }
          })}
        </div> */}
      </div>
      {/* {items.map((product) => (
        <div key={product.productId}>
          <Link to={`/MenuDetails/${product.id}`}>
            <img src={product.img} />
            <h2> {product.cat} </h2>
          </Link>
        </div>
      ))} */}
    </div>
  );
}

export default Menu;
