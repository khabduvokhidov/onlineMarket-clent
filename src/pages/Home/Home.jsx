import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, } from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Card from '../../components/Card/Card';
import './Home.css';

import Fridge from '../../img/fridge.jpg';
import Gaz from '../../img/bitavoy.jpg';
import makeUp from '../../img/makeUp2.webp';
import { useInfoContext } from '../../context/InfoContext';

export default function Home() {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear"
  };

  const cardSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 750,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const params = useParams()

  const { user, setLoading, productLoading, setProductLoading, products } = useInfoContext()
  const [image, setImage] = useState(null)

  const nameRef = useRef()
  const imageRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  const setToBase = (file) => {
    const render = new FileReader()
    render.readAsDataURL(file)
    render.onloadend = () => {
      setImage(render.result)
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setToBase(file);
  }

  const resetShare = () => {
    nameRef.current.value = "";
    priceRef.current.value = "";
    descRef.current.value = "";
    imageRef.current.value = "";
    setImage("")
  }

  let filteredProducts = []

  if (params.id) {
    filteredProducts = products.filter((product) => product.operatorId === params.id)
    console.log(filteredProducts);
  } else {
    filteredProducts = products
  }

  return (
    <>
      <section className="slider">
        <div className="container">
          <Slider {...settings}>
            <div className="slider__content">
              <img src={Fridge} alt="" className="slider__img" />
            </div>

            <div className="slider__content">
              <img src={makeUp} alt="" className="slider__img" />
            </div>

            <div className="slider__content">
              <img src={Gaz} alt="" className="slider__img" />
            </div>
          </Slider>
        </div>
      </section>
      <section className="items">
        <div className="container">
          <h2 className="items__title title">mahsulotlar</h2>

          <div className="items__cards"
            style={
              user?.role === "admin" ? (
                filteredProducts?.length === 0 ? (
                  { height: "unset", overflowY: "unset" }
                ) : (
                  filteredProducts?.length > 4 ? (
                    { height: "unset", overflowY: "unset" }
                  ) : (
                    { height: "680px", overflowY: "hidden" }
                  )
                )
              ) : (
                filteredProducts?.length === 0 ? (
                  { height: "unset", overflowY: "unset" }
                ) : (
                  filteredProducts?.length > 4 ? (
                    { height: "unset", overflowY: "unset" }
                  ) : (
                    { height: "550px", overflowY: "hidden" }
                  )
                )
              )
            }>
            <Slider {...cardSettings}>
              {
                filteredProducts?.map((product, id) => (
                  <Card
                    key={id}
                    data={product}
                  />
                ))
              }
            </Slider>
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
              <h2 className="about__title title">Saytimiz haqida</h2>

              <p className="about__txt">Assalomu aleykum! Bizning <span className="bold-span">Afruza-Shop</span> saytimizda siz mahsulotlarni uyda o'tirib onlayn buyurtma berishingiz mumkin. O'zingizga yoqqan mahsulotni tanlab, shahar va manzilingizni kiritishingiz kerak. Manzilingizni kiritganingizdan so'ng siz bilan biznig operatorlarimizdan biri bog'lanib, sizga mahsulotni jo'natib yuboradi va siz mahsulotni qabul qilib olishingiz mumkin. Agar qandaydir savollaringiz bo'lsa sayt admini bilan bog'lanishingiz mumkin. Sizlarga yaxshi xaridlarni tilab qolamiz{")"}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}