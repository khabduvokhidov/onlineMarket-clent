import React from 'react'
import { faShoppingCart, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <div className="container dis-flex nav__container">
          <Link to="/" className="nav__logo">Afruza-Shop</Link>
          <div className="nav__burger">
            <span className="nav__burger-line"></span>
          </div>
          <div className="nav__menu dis-flex">
            <ul className="nav__list dis-flex">
              <li className="nav__item"><a href="#" className="nav__link"><FontAwesomeIcon icon={faPhoneFlip} className="nav__icon" /></a></li>
              <li className="nav__item"><a href="#" className="nav__link"><FontAwesomeIcon icon={faShoppingCart} className="nav__icon" /></a></li>
              <Link to="/register" className='nav__btn'>Ro'yxatdan O'tish</Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}