import React from 'react'
import { toast, ToastContainer } from 'react-toastify';

import { deleteSalesHistory } from '../../api/salesHistory';
import { useInfoContext } from '../../context/InfoContext';

import "./DeliveredOrders.css"

export default function DeliveredOrders() {
  const { user, delivered, loading, setLoading, productLoading, setProductLoading } = useInfoContext()

  const showToastError = () => {
    toast.error('"Sahifani yangilang!', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const deletCard = async (e) => {
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
      <section className="delivered">
        <div className="container">
          {
            delivered?.length > 0 ? (
              <h2 className="delivered__title title">yetkazib berilgan mahsulotlar</h2>
            ) : (
              <h2 className="delivered__title title">hali yetkazib berilgan mahsulotlar yo'q</h2>
            )
          }
          <div className="delivered__cards cards">
            {
              delivered?.length > 0 && delivered.map((delivery, id) => {
                return (
                  <div className='delivered__card card' key={id}>

                    <div className="delivered__card__body card__body">
                      <p>{delivery?.orderId?.city}</p>
                      <p>{delivery?.orderId?.district} ga</p>
                      <p><span>{delivery?.orderId?.count}</span>ta yetkazib berildi</p>
                      <p>Umumiy narxi: <span>{delivery?.orderId?.price * delivery?.orderId?.count}</span> so'm</p>
                      <p>Operatorning ismi va familiyasi: <span className="bold-span">{delivery?.operatorId?.firstname} {delivery?.operatorId?.lastname}</span></p>
                      <p>Operatorning e-maili: <span className="bold-span">{delivery?.operatorId?.email}</span></p>
                      <p>Operatorning telefon raqami: <span className="bold-span">{delivery?.operatorId?.phone}</span></p>
                    </div>

                    <div className="delivered__card__footer card__footer">
                      <button className="del-btn" disabled={loading} onClick={deletCard} id={delivery._id} > {loading ? "loading" : "delete"} </button>
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