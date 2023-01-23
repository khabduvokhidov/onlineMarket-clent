import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { addArchive } from '../../api/salesHistory'
import { useInfoContext } from '../../context/InfoContext'

import "./SalesOne.css"

export default function SalesOne() {
  const { user, order, loading, setLoading } = useInfoContext()
  const params = useParams()
  const navigate = useNavigate()

  const orderIdRef = useRef()

  const addByOperator = async (e) => {
    e.preventDefault()
    try {
      if (user?.role === "operator" || user.role === "admin") {
        setLoading(true)
        const data = new FormData()
        data.append("operatorId", user._id)
        data.append("orderId", orderIdRef.current.id)
        const res = await addArchive(data)
        console.log(res);
        toast.success(res.data.message)
        setLoading(false)
        // navigate("/sales")
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  let filtredProduct = []
  if (params.orderId) {
    filtredProduct = order.filter((orders) => orders._id === params.orderId)
  }
  return (
    <>
      <section className="salesOne">
        <div className="container">
          <div className="salesOne__cards cards">
            {
              filtredProduct?.map((orderOne, id) => {
                return (
                  <div className='salesOne__card card' key={id}>
                    <div className="salesOne__card__header card__header">
                      <img className="orderImage" src={orderOne?.productId?.image?.url} alt="product" />
                    </div>
                    <div className="salesOne__card__body card__body">
                      <p>Mahsulot nomi: <span className="bold-span">{orderOne?.productId?.name}</span></p>
                      <p>Buyurtmachinig shahri: <span className="bold-span">{orderOne?.city}</span></p>
                      <p>Tumani: <span className="bold-span">{orderOne?.district}</span></p>
                      <p>Tel raqami: <span className="bold-span">{orderOne?.userId?.phone}</span></p>
                      <p>Miqdori: <span className="bold-span">{orderOne?.count}</span> ta </p>
                    </div>
                    <form onSubmit={addByOperator}>
                      <label htmlFor={orderOne._id} className="salesOne__card--label">
                        Mahsulotni oldim: 
                        <input
                          required
                          type="checkbox"
                          id={orderOne._id}
                          className="salesOne__card--input"
                          ref={orderIdRef}
                        />
                      </label>
                      <button className="salesOne__card--btn">Mahsulotni xarid qildim</button>
                    </form>
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