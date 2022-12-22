import React, { useState } from "react";
import "./Card.css";
import { faCaretDown, faCaretUp, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gaz from '../../img/plita.jpg';

function Card() {
  const [count, setCount] = useState(0)

  const countPlus = () => {
    setCount(count + 1)
  }

  const countMinus = () => {
    setCount(count - 1)
  }

  return (
    <div className="card">
      <div class="card__header">
        <img src={Gaz} alt="item" class="card__img" />
        <p class="card__desc">Gaz Plita 2022</p>
      </div>
      <div class="card__body dis-flex">
        <span class="card__span">Narxi:</span>
        <h3 class="card__price">3.000.000 so'm</h3>
      </div>
      <div class="card__footer">
        <button class="card__btn">$ Add to cart</button>
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
  )
}

export default Card;