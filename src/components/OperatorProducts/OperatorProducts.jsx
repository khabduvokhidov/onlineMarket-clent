import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { deleteProducts } from '../../api/productRequest'
import { deleteSalesHistory } from '../../api/salesHistory'
import { useInfoContext } from '../../context/InfoContext'

import "./OperatorProducts.css"

export default function OperatorProducts() {
  const { serverPublic, user, products, setProductLoading, productLoading, loading, setLoading } = useInfoContext()
  // const params = useParams()
  const { operatorId } = useParams()

  const [data, setData] = useState({
    orders: null,
    error: null
  })

  useEffect(() => {
    ; (async () => {
      try {
        setData({ ...data, isLoading: true })

        const API = axios.create({ baseURL: "https://onlinemarket.onrender.com/" })

        API.interceptors.request.use((req) => {
          if (localStorage.getItem("token")) {
            req.headers.token = localStorage.getItem("token")
          }

          return req
        })

        const res = await API.get(`salesHis/saleshstory/operators/${operatorId}`)

        if (typeof res.data === "string") {
          setData({ ...data, isLoading: false, orders: null })
        } else {
          setData({ ...data, isLoading: false, orders: res.data })
        }

      } catch (error) {
        setData({ ...data, isLoading: false, orders: null, error: error })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverPublic, operatorId, productLoading])

  const showToastError = () => {
    toast.error('"Sahifani yangilang!', {
      position: toast.POSITION.TOP_RIGHT
    })
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
      <section className="operatorProduct">
        <div className="container">
          <h2 className='operatorProduct__title title'>operator sotgan mahsulotlar!!!</h2>
          <div className="operatorProduct__cards cards">
            {
              data?.orders?.map((product, id) => {
                return (
                  <div className="operatorProduct__card card" key={id}>
                    <div className="operatorProduct__card__body card__body">
                      <p>Mahsulot narxi: <span className="bold-span">{product?.orderId?.price}</span> so'm</p>
                      <p>Sotgan mahsulotining miqdori: <span className="bold-span">{product?.orderId?.count}</span> ta</p>
                      <p>Operatorning ismi: <span className="bold-span">{product?.operatorId?.firstname} {product?.operatorId?.lastname}</span></p>
                      <p>{product?.operatorId?.firstname}ning telefon raqami: <span className="bold-span">{product?.operatorId?.phone}</span></p>
                      <p>{product?.operatorId?.firstname}ning e-maili: <span className="bold-span">{product?.operatorId?.email}</span></p>
                    </div>
                    <div className="operatorProduct__card__footer card__footer">
                      {
                        user?.role === "admin" &&
                        <button disabled={loading} onClick={deleteCard} id={product._id} className="del-btn">
                          Delete
                        </button>
                      }
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