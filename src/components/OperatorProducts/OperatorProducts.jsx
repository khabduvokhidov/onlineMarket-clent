import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { deleteProducts } from '../../api/productRequest'
import { useInfoContext } from '../../context/InfoContext'

import "./OperatorProducts.css"

export default function OperatorProducts() {
  const { user, products, setProductLoading, productLoading, loading, setLoading } = useInfoContext()
  const params = useParams()

  const deleteCard = async (e) => {
    try {
      setLoading(true)
      const res = await deleteProducts(e.target.id)
      await setProductLoading(!productLoading)
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Qaytadan urinib ko'ring(")
    }
  }

  let filtredProduct = []

  if (params.id) {
    filtredProduct = products.filter((product) => product?.operatorId?._id === params.id)
  }
  return (
    <>
      <section className="operatorProduct">
        <div className="container">
          {
            filtredProduct?.length > 0 ? (
              <h2 className='operatorProduct__title'>operator qo'shgan mahsulotlari!!!</h2>
            ) : (
              <h1 className='operatorProduct__title title__error'>operator hali mahsulot qo'shmagan</h1>
            )
          }
          <div className="operatorProduct__cards">
            {
              filtredProduct?.length > 0 && filtredProduct?.map((product, id) => {
                return (
                  <div className="operatorProduct__card" key={id}>
                    <div className='operatorProduct__card__header'>
                      <img className='operatorProduct__card--img' src={product?.image?.url} alt="photo" />
                    </div>
                    <div className="operatorProduct__card__body">
                      <h3 className="operatorProduct__card--title">Mahsulot nomi: <span className="operatorProduct__span">{product.name}</span></h3>
                      <span className="operatorProduct__card--span">Mahsulot narxi: {product.price}</span>
                      <p className='operatorProduct__card--desc'>Mahsulot haqida: {product.desc}</p>
                      <p className='operatorProduct__card--name'>Operator ism: <span className="operatorProduct__span">{product?.operatorId?.firstname} {product?.operatorId?.lastname}</span></p>
                      <p className='operatorProduct__card--phone'>{product?.operatorId?.firstname}ning telefon raqami: <span className="operatorProduct__span">+998{product?.operatorId?.phone}</span></p>
                      <p className='operatorProduct__card--mail'>{product?.operatorId?.firstname}ning elektron pochtasi: {product?.operatorId?.email}</p>

                      <p className='operatorProduct__card--decision'>mahsulot sotilganmi yoki yoqmi</p>
                    </div>
                    <div className="operatorProduct__card__footer">
                      {
                        user?.role === "admin" &&
                        <button disabled={loading} onClick={deleteCard} id={product._id} className="operatorProduct__del--btn">
                          Delete
                        </button>
                      }
                      <Link to={`order/saleshistory/${product._id}`} className='operatorProduct__show--btn'>Ko'rish</Link>
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