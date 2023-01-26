import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { signUp } from '../../api/registerRequest'
import Operators from '../../components/Operators/Operators'
import { useInfoContext } from '../../context/InfoContext'

export default function Admin() {
  // show password
  const [password, setPassword] = useState(false)
  const showPassword = (e) => {
    e.preventDefault()
    setPassword(!password)
  }

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    confirmpass: "",
  }

  const navigate = useNavigate()

  const { productLoading, setProductLoading, loading, setLoading } = useInfoContext()

  const [confirmPass, setConfirmPass] = useState(true)

  const [data, setData] = useState(initialState)

  // react toastify
  const showToastMessage = () => {
    toast.success("Ro'yxatdan O'tish Muvaffaqiyatli Amalga Oshdi!", {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  // sign up
  const signUpUser = async () => {
    try {
      setLoading(true)
      await signUp(data)
      showToastMessage()
      await setProductLoading(!productLoading)
      resetForm()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.response.data.message)
    }
  }

  // handle input
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // handle submit form
  const handleSubmitForm = async (e) => {
    setConfirmPass(true)
    e.preventDefault()
    try {
      if (data.confirmpass === data.password) {
        return signUpUser()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //reset form
  const resetForm = () => {
    setData(initialState)
    setConfirmPass(confirmPass)
  }

  return (
    <>
      <section className="register">
        <div className="container">
          <div className="register__tabs tabs">

            <div className="tabs__blocks">

              <h2 className='tabs__title active' style={{ width: "100%", cursor: "default" }}>
                Operator/Foydalanuvchilarni Ro’yxatdan O’tkazish
              </h2>

            </div>

            <div className="tabs__contents">

              <div className='tabs__content active'>

                <form className="tabs__form" onSubmit={handleSubmitForm}>

                  <label className='tabs__label' htmlFor="firstname">
                    Ism:
                    <input
                      required
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Abdurahmon"
                      className='tabs__input'
                      value={data.firstname}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="lastname">
                    Familiya:
                    <input
                      required
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Sobirjonov"
                      className='tabs__input'
                      value={data.lastname}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="userPhone">
                    Nomeringizni kiriting:
                    <input
                      required
                      type="number"
                      name='phone'
                      id="userPhone"
                      placeholder='99 878 12 12'
                      className='tabs__input'
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="adminEmail">
                    E-mail Kiriting:
                    <input
                      required
                      type="email"
                      name='email'
                      id="adminEmail"
                      placeholder='username24@gmail.com'
                      className='tabs__input'
                      value={data.email}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="adminPassword">
                    Parolingiz:
                    <input
                      required
                      type={password ? "text" : "password"}
                      name='password'
                      id="adminPassword"
                      placeholder='12345678'
                      className='tabs__input'
                      autoComplete='false'
                      value={data.password}
                      onChange={handleInput}
                    />
                    <button className="tabs__btn-icon" onClick={showPassword}>
                      <FontAwesomeIcon icon={password ? faEyeSlash : faEye} className="tabs__icon" />
                    </button>
                  </label>

                  <label className='tabs__label' htmlFor="adminConfirmPassword">
                    Parolingizni Tasdiqlnag:
                    <input
                      required
                      type={password ? "text" : "password"}
                      name='confirmpass'
                      id="adminConfirmPassword"
                      placeholder='12345678'
                      className='tabs__input'
                      autoComplete='false'
                      value={data.confirmpass}
                      onChange={handleInput}
                    />
                    <button className="tabs__btn-icon" onClick={showPassword}>
                      <FontAwesomeIcon icon={password ? faEyeSlash : faEye} className="tabs__icon" />
                    </button>
                  </label>

                  <h4>Rolingizni tanlang:</h4>

                  <label htmlFor="user" className="tabs__label">
                    user
                    <input
                      type="radio"
                      name='role'
                      id="user"
                      value="user"
                      className="tabs__radio"
                      onChange={handleInput}
                    />
                  </label>

                  <label htmlFor="operator" className="tabs__label">
                    operator
                    <input
                      required
                      type="radio"
                      name='role'
                      id="operator"
                      value="operator"
                      className="tabs__radio"
                      onChange={handleInput}
                    />
                  </label>

                  <button type="submit" className="tabs__btn" disabled={loading}>
                    {loading ? "Kuting..." : "Ro'yxatdan O'tish"}
                  </button>

                </form>
              </div>

            </div>

          </div>
        </div>
      </section>
      {/* <ToastContainer /> */}
      <Operators />
    </>
  )
}