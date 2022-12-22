import React from 'react'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__info dis-flex">
            <Link to="/" className='footer__link'>Afruza-Shop</Link>
            <p className="footer__txt">&copy; Created By Abdurahmon And Bilol. 2022</p>
            <a href="#" className="footer__contact"><FontAwesomeIcon icon={faPhoneFlip} className="footer__icon" /></a>
          </div>
        </div>
      </footer>
    </>
  )
}