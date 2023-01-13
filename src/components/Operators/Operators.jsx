import React from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'

import { delUser } from '../../api/userRequest'
import { useInfoContext } from '../../context/InfoContext'

import "./Operators.css"

export default function Operators() {
  const { operators, setOperators, setLoading, productLoading, setProductLoading } = useInfoContext()

  const showToastError = () => {
    toast.error('"Sahifani yangilang!', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const deleteUser = async (e) => {
    try {
      setLoading(true)
      const res = await delUser(e.target.id)
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
    <section className="operators">
      <div className="container">
        <div className="operators__cards">
          {
            operators?.map((operator, id) => {
              return (
                <div className="operators__card" key={id}>
                  {/* <Link to="/" className='operator_smile'> */}
                  <div className="operator__header">
                    <FontAwesomeIcon icon={faHeadset} className="operator__icon" />
                  </div>
                  <div className="operator__body">
                    <h3 className="operator__name">
                      {operator?.lastname} {operator?.firstname} <span className="operator__span">{operator?.role}</span>
                    </h3>
                    <p className="operator__mail">{operator?.email}</p>
                    <p className="operator__phone">+998{operator?.phone}</p>
                  </div>
                  <div className="operator__footer">
                    <Link to={`product/products/${operator._id}`} className="operator__btn">Qo'shgan mahsulotlari</Link>

                    <button onClick={deleteUser} id={operator._id} className="operator__del-btn">Delete</button>
                  </div>
                  {/* </Link> */}
                </div>
              )
            })
          }
        </div>
        <ToastContainer />
      </div>
    </section>
  )
}