import "./Menu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
function Menu() {
  const state = useSelector((state) => {
    return {
      items: state.itemReducer.items,
    };
  });

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [myBool, setmyBool] = useState(true);

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
        console.log("hehe");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-nav">
        <NavBar />
      </div>
      <h1>Menu</h1>
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
              {state.items.map((element) => {
                if (element.cat === "hot") {
                  return (
                    <div className="img-card">
                      <Link to={`/${element.id}`} className="product-name">
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
            {state.items.map((element) => {
              if (element.cat === "cold") {
                return (
                  <div className="img-card">
                    <Link to={`/${element.id}`} className="product-name">
                      <img src={element.img} />
                      <h5 className="product-name"> {element.name} </h5>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
