import React from 'react';
import './Home.css';
import { faArrowRight, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fridge from '../../img/fridge.jpg';
import Gaz from '../../img/plita.jpg';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="slider">
        <div className="container">
          <div className="slider__content">
            <img src={Fridge} alt="" className="slider__img" />
          </div>
        </div>
      </section>
      <section className="items">
        <div className="container">
          <h2 className="items__title">Mahsulotlar</h2>
          <div className="cards">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <Link to="/products" className="items__link">Barcha Mahsulotlar <FontAwesomeIcon icon={faArrowRight} className="link__icon" /></Link>
        </div>
      </section>
      <section className="about">
        <div className="container">
          <div className="about__content">
            <div className="about__image">
              <img src={Gaz} alt="" className="about__img" />
            </div>
            <div className="about__desc">
              <h2 className="about__title">Saytimiz haqida</h2>
              <p className="about__txt">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum repellendus doloribus iure quia hic blanditiis facilis odit tempore, provident deserunt officia consequuntur nulla vitae possimus ratione esse recusandae repudiandae odio in laboriosam ab, architecto quod. Quis, odio perspiciatis aspernatur iure veniam dolores officiis sunt ut! Sapiente nesciunt nemo explicabo deleniti!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}