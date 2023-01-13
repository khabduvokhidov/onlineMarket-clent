import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
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
    <section className="order">
      <div className="container">
        <div className="order__cards">
          {
            order.map((orders, id) => {
              return (
                <div className="order__card" key={id}>
                  <div className="order__figure">
                    <img className="order__img" src={orders?.productId?.image?.url} alt="item" />
                  </div>
                  <div className="order__info">
                    <h3 className="order__name">{orders?.productId?.name}</h3>
                    <p>{orders?.city}</p>
                    <p>{orders?.district}</p>
                    <p>{orders?.address}</p>
                    <p>{orders?.userId?.phone}</p>
                  </div>
                  <button onClick={deleteSelsHis} id={orders._id} className="order__del-btn">delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}