import React from "react";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css"; 
import "./style.css";
import c1 from "./img/c1.jpg";
import c2 from "./img/c2.jpg";
import c3 from "./img/c3.jpeg";
import card1 from "./img/card1.png";
import card2 from "./img/card2.jpeg";
import card3 from "./img/card3.jpeg";


const images = [c1,c2,c3];
const cardData = [
  { image: card1, 
    Brand:" iDestiny", Price: "₹1500"  },
    { image: card2,Brand:"Carepal Pro 4G Smart Watch Phone", Price: "₹5000"},
    { image: card3,Brand:"Philo GEN-9 Rose Gold Smartwatch  ", Price:"₹1081"}

];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
  }, []);
  return (
    <> 
    <div className="carousel">
                <img src={images[currentIndex]} alt=" Banner" />
            </div>
                  <br></br>
                  <center> <h1>Tech Treasures</h1></center>
                  <br></br>
                  <div className="card-container">
    {cardData.map((card, index) => (
        <div key={index} className="card">
            <img src={card.image} alt={card.title} />
            <h3>{card.Brand}</h3>
            <h4><p>{card.Price} 
</p></h4>

            <button className="buy-now">🛍️ Buy Now</button>
            <button className="add-to-cart">🛒 Add to Cart</button>
            </div>
          ))}
        </div>
        
          </>
  )
};

export default Home;
