import React, { useState } from "react";
import "./Card.css";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gaz from "../../img/plita.jpg";

function Card() {
  const [count, setCount] = useState(0);

  const countPlus = () => {
    setCount(count + 1);
  };

  const countMinus = () => {
    setCount(count - 1);
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src={Gaz} alt="item" className="card__img" />
        <p className="card__desc">Gaz Plita 2022</p>
      </div>
      <div className="card__body dis-flex">
        <span className="card__span">Narxi:</span>
        <h3 className="card__price">3 000 000 UZS</h3>
      </div>
      <div className="card__footer">
        <button className="card__btn">
          <FontAwesomeIcon icon={faCartPlus} className="card__icon" /> Savatga qo'shish
        </button>
      </div>
      {/* <img width='100%' src={Gaz} alt="Sneakers" />
      <h5>Gaz Plita</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>1234 руб.</b>
        </div>
      </div> */}
    </div>
  );
}

export default Card;
