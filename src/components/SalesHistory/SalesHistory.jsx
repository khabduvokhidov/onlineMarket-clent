import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { delSalesHis } from "../../api/orderRequest"
import { useInfoContext } from '../../context/InfoContext'

import "./SalesHistory.css"
export default function SalesHistory() {
  const { order, setLoading, productLoading, setProductLoading } = useInfoContext()

  const showToastError = () => {
    toast.error('"Sahifani yangilang!', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const deleteSelsHis = async (e) => {
    try {
      setLoading(true)
      const res = await delSalesHis(e.target.id)
      console.log(res);
      setProductLoading(!productLoading)
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showToastError()
      console.log(error);
    }
  }


  return (
    <>
      <section className="order">
        <div className="container">
          {
            order?.length > 0 ? (
              <h2 className="order__title title">buyurtma berilgan mahsulotlar</h2>
            ) : (
              <h2 className="order__title title">hali mahsulotlar buyurtma berilmagan</h2>
            )
          }
          <div className="order__cards cards">
            {
              order?.length > 0 && order.map((orders, id) => {
                return (
                  <div className="order__card card" key={id}>
                    <Link to={`/salesHis/newsales/one/${orders._id}`} className="order__link">
                      <div className="order__figure">
                        <img className="order__img card__img" src={orders?.productId?.image?.url} alt="item" />
                      </div>
                    </Link>
                    <div className="order__info card__body">
                      <p>Mahsulot nomi: <span className="bold-span">{orders?.productId?.name}</span></p>
                      <p>Buyurtmachinig shahri: <span className="bold-span">{orders?.city}</span></p>
                      <p>Tumani: <span className="bold-span">{orders?.district}</span></p>
                      <p>Tel raqami: <span className="bold-span">{orders?.userId?.phone}</span></p>
                    </div>
                    <div className="order__footer card__footer">
                      <button onClick={deleteSelsHis} id={orders._id} className="order__del-btn del-btn">delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}