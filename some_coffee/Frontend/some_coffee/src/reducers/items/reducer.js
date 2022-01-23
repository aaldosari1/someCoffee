const initialState = {
  items: [
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
  ],
};

const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default itemReducer;
