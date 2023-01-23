import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { addOrderProduct } from '../../api/orderRequest'
import { useInfoContext } from '../../context/InfoContext'

import "./Product.css"

export default function Product() {
  const { user, products, loading, setLoading } = useInfoContext()
  const params = useParams()
  const navigate = useNavigate()

  const countRef = useRef()
  const cityRef = useRef();
  const districtRef = useRef();

  const addOrder = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = new FormData()
      data.append("productId", params.id)
      data.append("userId", user._id)
      data.append("count", countRef.current.value)
      data.append("city", cityRef.current.value)
      data.append("district", districtRef.current.value)

      const res = await addOrderProduct(data)
      localStorage.setItem('Order Product', JSON.stringify(res.data.newOrder))
      toast.success(res.data.message)
      resetShare()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error);
    }

  }

  let filtredProduct = []
  if (params.id) {
    filtredProduct = products.filter((product) => product._id === params.id)
  }

  const resetShare = () => {
    countRef.current.value = "";
    districtRef.current.value = "";
    cityRef.current.value = "";
  }

  return (
    <>
      <section className="product">
        <div className="container">
          {
            filtredProduct?.map((product, id) => {
              return (
                <div className="product__order dis-flex" key={id}>
                  <div className="product__info dis-flex">
                    <div className="product__image">
                      <img className="product__img" src={product?.image?.url} alt="item" />
                    </div>
                    <div className="product__desc">
                      <h2 className="product__name">{product?.name}</h2>
                      <span className="product__Price"><span className="bold-span">{product?.price}</span> so'm</span>
                      <p className="product__descr">{product?.desc}</p>
                    </div>
                  </div>

                  <div className="product__form-box">
                    <form onSubmit={addOrder} className="product__form">
                      <label htmlFor="city" className="product__label">
                        Shaharingizni kiriting:
                        <input
                          required
                          name="city"
                          id="city"
                          type="text"
                          placeholder='Toshkent Shahri'
                          className='product__input'
                          ref={cityRef}
                        />
                      </label>

                      <label htmlFor="district" className="product__label">
                        Tumaningizni kiriting:
                        <input
                          required
                          name="district"
                          id="district"
                          type="text"
                          placeholder='Olmazor Tumani'
                          className='product__input'
                          ref={districtRef}
                        />
                      </label>

                      <label htmlFor="count" className="product__label">
                        Mahsulotning miqdorini kiriting:
                        <input
                          required
                          name="count"
                          id="count"
                          type="number"
                          placeholder='1'
                          defaultValue="1"
                          className='product__input'
                          ref={countRef}
                        />
                      </label>

                      <button className="product__btn" type='submit'>Xarid qilish</button>
                    </form>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      < ToastContainer />
    </>
  )
}