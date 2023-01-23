import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'

import "./Navbar.css"
import { useInfoContext } from '../../context/InfoContext'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)
  const { user, setUser } = useInfoContext()

  const clickMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <nav className="nav">
        <div className="container dis-flex nav__container">

          <Link to="/" className="nav__logo">Afruza-Shop</Link>

          <div className={openMenu ? "nav__burger active" : "nav__burger"} onClick={clickMenu}>
            <span className="nav__burger-line"></span>
          </div>

          <div className="nav__menu dis-flex">

            <ul className="nav__list dis-flex">

              <li className="nav__item">
                <Link to="/" className="nav__link">bosh sahifa</Link>
              </li>

              <li className="nav__item">
                <Link to="/products" className="nav__link">mahsulotlar</Link>
              </li>

              {
                user?.role === "admin" || user?.role === "operator" ?
                  <>
                    <li className="nav__item">
                      <Link to="/sales" className="nav__link">buyurtmalar</Link>
                    </li>

                    <li className="nav__item">
                      <Link to="/acceptedorders" className="nav__link">qabul qilingan buyurtmalar</Link>
                    </li>

                    <li className="nav__item">
                      <Link to="/deliveredorders" className="nav__link">yetkazilgan mahsulotlar</Link>
                    </li>
                  </> : ""
              }

              {
                user?.role === "admin" && (
                  <li className="nav__item">
                    <Link to="/admin" className="nav__link">admin</Link>
                  </li>
                )
              }

            </ul>

            <ul className="nav__contacts dis-flex">

              <li className="nav__item">
                <a href="#" className="nav__contact"><FontAwesomeIcon icon={faPhoneFlip} className="nav__icon" /></a>
              </li>

              {
                user && (
                  <Link to="/" className='nav__btn' onClick={() => {
                    localStorage.clear()
                    setUser(null)
                  }}>Chiqish</Link>
                )
              }

              {
                user ? <h3 className="nav__firstname">{user.firstname}</h3> : <Link to="/register" className='nav__btn'>Ro'yxatdan O'tish</Link>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}