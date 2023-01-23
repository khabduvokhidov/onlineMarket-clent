import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { deleteSalesHistory, updateSalesHistory } from '../../api/salesHistory'
import { useInfoContext } from '../../context/InfoContext'
import "./AcceptedOrders.css"

export default function AcceptedOrders() {
  const { user, orders, loading, setLoading, productLoading, setProductLoading } = useInfoContext()
  const navigate = useNavigate()

  const showToastError = () => {
    toast.error('"Sahifani yangilang!', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const handleSubmit = async (e) => {
    try {
      const res = await updateSalesHistory(e.target.id)
      await setProductLoading(!productLoading)
      toast.success(res.data.message)
      // navigate("/sales")
      showToastError()
    } catch (error) {
      console.log(error);
      showToastError()
    }
  }

  const deleteCard = async (e) => {
    try {
      setLoading(true)
      const res = await deleteSalesHistory(e.target.id)
      await setProductLoading(!productLoading)
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      showToastError()
    }
  }

  return (
    <>
      <section className="acceptedOrders">
        <div className="container">
          {
            orders?.length > 0 ? (
              <h2 className="delivered__title title">qabul qilingan buyurtmalar</h2>
            ) : (
              <h2 className="delivered__title title">hozircha qabul qilingan buyurtmalar yo'q</h2>
            )
          }
          <div className="acceptedOrders__cards cards">

            {
              orders?.length > 0 && orders.map((ordersProducts, id) => {
                return (
                  <div className='acceptedOrders__card card' key={id}>
                    {
                      ordersProducts?.orderId?.map((order, id) => {
                        return (
                          <div className='acceptedOrders__card__header' key={id}>
                            <div className="acceptedOrders__card--image card__header">
                              {
                                order.productId?.map((product, id) => {
                                  return (
                                    <div key={id}>
                                      <img className='acceptedOrders__card--img card__img' src={product?.image?.url} alt="item" />
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="acceptedOrders__card--desc">
                              <p>Mahsulot nomi: <span className="bold-span"></span></p>
                              <p>Miqdori: <span className="bold-span">{order?.count}</span>ta</p>
                              <p>Umumiy narxi: <span className="bold-span">{order?.price * order?.count}</span> so'm</p>
                              <p>Shahri: <span className="bold-span">{order?.city}</span></p>
                              <p>Tumani: <span className="bold-span">{order?.district}</span></p>
                            </div>
                          </div>
                        )
                      })
                    }
                    <div className="acceptedOrders__card__body card__body">
                      {
                        ordersProducts?.operatorId?.map((operator, id) => {
                          return (
                            <div key={id}>
                              <p>Operatorning ismi va familiyasi: <span className="bold-span">{operator?.firstname} {operator?.lastname}</span></p>
                              <p>Operatorning e-maili: <span className="bold-span">{operator?.email}</span></p>
                              <p>Operatorning telefon raqami: <span className="bold-span">{operator?.phone}</span></p>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="acceptedOrders__card__footer card__footer">
                      {
                        user?.role === "admin" && // adminda turbdi agar operator bosez admin qisez korasiz
                        <>
                          <div className="acceptedOrders__card--form">
                            <label htmlFor="ordersDelivered" className='acceptedOrders__card--label'>
                              Mahsulot yetkazildi
                              <input type="checkbox" name="texts" id="ordersDelivered" className='acceptedOrders__card--input' />
                            </label>
                          </div>
                          <button onClick={handleSubmit} id={ordersProducts._id} className="acceptedOrders__card--btn">Saqlash</button>
                        </>
                      }

                      <button className="del-btn" disabled={loading} onClick={deleteCard} id={ordersProducts._id}>
                        {loading ? "loading" : "delete"}
                      </button>
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