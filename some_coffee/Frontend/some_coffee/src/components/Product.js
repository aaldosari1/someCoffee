import { useSelector } from "react-redux";
import { useState } from "react";

import axios from "axios";

function Product() {
  const [product, setProduct] = useState("");

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  const addProduct = () => {
    const data = {
      name: product,
    };

    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios
      .post("http://localhost:8080/product", data, config)
      .then((res) => {
        console.log(config);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = (e) => {
    setProduct(e.target.value);
  };

  return (
    <div>
      <h1>Product page</h1>
      <hr />

      <input
        onChange={getProduct}
        placeholder="Enter product name"
        required
      ></input>
      <button onClick={addProduct}>Add</button>
    </div>
  );
}

export default Product;
