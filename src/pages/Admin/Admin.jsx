import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'

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
    confirmpass: "",
    role: "",
    phone: ""
  }

  const { setUser, loading, setLoading } = useInfoContext()

  const [confirmPass, setConfirmPass] = useState(true)

  const [data, setData] = useState(initialState)

  // react toastify
  const showToastMessage = () => {
    toast.success("Ro'yxatdan O'tish Muvaffaqiyatli Amalga Oshdi!", {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  //reset form
  const resetForm = () => {
    setData(initialState)
    setConfirmPass(confirmPass)
  }

  // sign up
  const signUpUser = async () => {
    try {
      setLoading(true)
      const res = await signUp(data)
      setUser(res.data.newUser)
      console.log(res);
      showToastMessage()
      resetForm()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.response.data.message)
    }
  }

  // handleInput
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  //handle submit form
  const handleSubmitForm = async (e) => {
    setConfirmPass(true)
    e.preventDefault()
    try {
      if (data.confirmpass === data.password ) {
        return signUpUser
      }
    } catch (error) {
      toast.error(error.message)
    }
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

                  <label className='tabs__label' htmlFor="name">
                    Ism:
                    <input
                      required
                      type="text"
                      name="firstname"
                      id="name"
                      placeholder="Abdurahmon"
                      className='tabs__input'
                      value={data.firstname}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="surname">
                    Familiya:
                    <input
                      required
                      type="text"
                      name="lastname"
                      id="surname"
                      placeholder="Sobirjonov"
                      className='tabs__input'
                      value={data.lastname}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="phone">
                    Nomeringizni kiriting:
                    <input
                      required
                      type="number"
                      name='phone'
                      id="phone"
                      placeholder='99 878 12 12'
                      className='tabs__input'
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="signUpEmail">
                    E-mail Kiriting:
                    <input
                      required
                      type="email"
                      name='email'
                      id="signUpEmail"
                      placeholder='username24@gmail.com'
                      className='tabs__input'
                      value={data.email}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="signUpPassword">
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

                  <label className='tabs__label' htmlFor="signUpPassword">
                    Parolingizni Tasdiqlnag:
                    <input
                      required
                      type={password ? "text" : "password"}
                      name='confirmpass' id="signUpPassword"
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
      <ToastContainer />
      <Operators />
    </>
  )
}