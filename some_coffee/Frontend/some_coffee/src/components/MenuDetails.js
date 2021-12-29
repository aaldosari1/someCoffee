import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import axios from "axios";

function MenuDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);

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
    <div>
      <h1>hello from the Product details {id}</h1>
      {products.map((product) => {
        let num = parseInt(id);
        if (num === product.productId) {
          return (
            <div key={product.productId}>
              <h2> item name: {product.name} </h2>
              <h2> {product.cost} </h2>
              <h2> {product.price} </h2>
              <h2> {product.category} </h2>
            </div>
          );
        }
      })}
      <StarRating />
    </div>
  );
}

export default MenuDetails;
