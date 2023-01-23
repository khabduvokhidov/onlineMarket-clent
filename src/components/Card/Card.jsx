import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { deleteProducts } from "../../api/productRequest";
import { useInfoContext } from "../../context/InfoContext";

import "./Card.css";

function Card({ data }) {
  const params = useParams()

  const { user, loading, setLoading, productLoading, setProductLoading } = useInfoContext()

  const showToastMessage = () => {
    toast.success("Mahsulot o'chirildi!", {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const showToastError = () => {
    toast.error("Sahifani yangilang!", {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const deleteCard = async () => {
    try {
      setLoading(true)
      if (params.id) {
        return params.id === data._id
      }
      await deleteProducts(data._id)
      await setProductLoading(!productLoading)
      showToastMessage()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      showToastError()
    }
  }

  return (
    <>
      <div className="card__item">
        <div className="card">
          <div className="card__header">

            <img src={data?.image.url} alt="product" className="card__img" />

            <h3 className="card__title">{data?.name}</h3>

          </div>

          <div className="card__body">

            <div className="card__price-box dis-flex">
              <span className="card__span">Narxi:</span>
              <h3 className="card__price">{data?.price} so'm</h3>
            </div>

            <p className="card__desc">{data?.desc}</p>

          </div>

          <div className="card__footer">



            <Link to={`/product/products/one/${data?._id}`} className="card__btn">
              Batafsil Ko'rish
            </Link>

            {
              user?.role === "admin" &&
              <button disabled={loading} onClick={deleteCard} id={data._id} className={"card__del-btn del-btn"}>
                Delete
              </button>
            }

          </div>
        </div>

        {
          user?.role === "admin" && (
            <div className="card__operator">
              <h3 className="operator__name">
                <span className="operator__span">Mahsulot Egasi</span> {data?.operatorId?.firstname}
              </h3>
              <p className="operator__phone">+998{data?.operatorId?.phone}</p>
            </div>
          )
        }
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

export default Card;