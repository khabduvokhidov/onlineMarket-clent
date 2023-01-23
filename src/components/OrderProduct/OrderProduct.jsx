import React from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

import { delSalesHis } from '../../api/orderRequest';
import { useInfoContext } from '../../context/InfoContext';

import "./OrderProduct.css"

export default function OrderProduct() {
  const { order, setProductLoading, productLoading, setLoading } = useInfoContext()

  const params = useParams()

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

  let filtredProduct = []

  if (params.id) {
    filtredProduct = order.filter((orders) => orders?.productId?._id === params.id)
  }

  return (
    <>
      <section className='orderProduct'>
        <div className="container">
          {
            filtredProduct?.length > 0 ? (
              <h2 className='orderProduct__title title'>operator qo'shgan mahsulotlari!!!</h2>
            ) : (
              <h1 className='orderProduct__title title__error title'>operator hali mahsulot qo'shmagan</h1>
            )
          }
          <div className='orderProduct__cards cards'>
            {
              filtredProduct?.length > 0 && filtredProduct?.map((orders, id) => {
                console.log(orders);
                return (
                  <div className="orderProduct__card" key={id}>
                    <div className='orderProduct__card__header'>
                      <img className='orderProduct__card--img' src={orders?.productId?.image.url} alt="item" />
                    </div>
                    <div className="orderProduct__card__body">
                      <h3 className="orderProduct__card--title">Mahsulot nomi: <span className="orderProduct__span">{orders?.productId?.name}</span></h3>
                      <span className="orderProduct__card--span">{orders?.price} Mahsulot shu narxda sotildi</span>
                      <p className="orderProduct__card--count">Xaridor {orders?.count}ta dona sotib olmoqchi</p>
                      <h3 className="orderProduct__card--address">Yashaydigan manzili:</h3>
                      <p className='orderProduct__card--city'>Shahri: <span className="orderProduct__span">{orders?.city}</span></p>
                      <p className='orderProduct__card--district'>Tumani: <span className="orderProduct__span">{orders?.district}</span> ta dona sotib oldi</p>
                      <p className='orderProduct__card--appartment'>Yashaydigan manzili: <span className="orderProduct__span">{orders?.addresi}</span></p>
                    </div>
                    <div className="orderProduct__card__footer">
                      <button onClick={deleteSelsHis} id={orders._id} className="del-btn">
                        Delete
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