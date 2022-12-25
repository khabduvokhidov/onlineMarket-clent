import React from 'react';
import Card from '../../components/Card/Card';
import './Products.css';

export default function Products() {
  return (
    <>
      <section className="products">
        <div className="container">
          <h2 className="products__title">Barcha Mahsulotlar</h2>
          <div className="products__cards">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </>
  )
}