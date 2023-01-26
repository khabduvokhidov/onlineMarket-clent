import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'
import { logIn, signUp } from '../../api/registerRequest';

import 'react-toastify/dist/ReactToastify.css';

import { useInfoContext } from '../../context/InfoContext';

import "./Register.css";

export default function Register() {
  // register tab
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  }

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
    phone: ""
  }

  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const { setUser, loading, setLoading } = useInfoContext()
  const [confirmPass, setConfirmPass] = useState(true)
  const [data, setData] = useState(initialState)

  // sign up
  const signUpUser = async () => {
    try {
      setLoading(true)
      const res = await signUp(data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('profile', JSON.stringify(res.data.newUser))
      setUser(res.data.newUser)
      toast.success(res.data.message)
      navigate("/")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  // login
  const logInUser = async () => {
    try {
      setLoading(true)
      const res = await logIn(data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('profile', JSON.stringify(res.data.user))
      setUser(res.data.user)
      toast.success(res.data.message)
      setLoading(false)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message)
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
    if (toggleState === 1) {
      data.confirmpass === data.password ? signUpUser() : setConfirmPass(false)
    } else {
      logInUser()
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

              <h2
                className={toggleState === 1 ? 'tabs__title active' : 'tabs__title'}
                onClick={() => toggleTab(1)}>
                Ro’yxatdan O’tish
              </h2>

              <h2
                className={toggleState === 2 ? 'tabs__title active' : 'tabs__title'}
                onClick={() => toggleTab(2)}>
                Tizimga Kirish
              </h2>

            </div>

            <div className="tabs__contents">

              <div className={toggleState === 1 ? 'tabs__content active' : 'tabs__content'}>

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
                      placeholder='998901234567'
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
                      id="signUpPassword"
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

                  <label className='tabs__label' htmlFor="signUpConfirmPassword">
                    Parolingizni Tasdiqlnag:
                    <input
                      required
                      type={password ? "text" : "password"}
                      name='confirmpass'
                      id="signUpConfirmPassword"
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

                  <div>
                    <span style={{display: confirmPass ? "none" : "block"}} className="confirm_span" >
                      *parolingiz bir hil emas
                    </span>
                    
                    
                    <button type="submit" className="tabs__btn" disabled={loading}>
                      {loading ? "Kuting..." : toggleState === 1 && "Ro'yxatdan O'tish"}
                    </button>
                  </div>

                </form>
              </div>

              <div className={toggleState === 2 ? 'tabs__content active' : 'tabs__content'}>

                <form className="tabs__form" onSubmit={handleSubmitForm}>

                  <label className='tabs__label' htmlFor="logInEmail">
                    E-mail:
                    <input
                      required
                      type="email"
                      name='email'
                      id="logInEmail"
                      placeholder='username24@gmail.com'
                      className='tabs__input'
                      value={data.email}
                      onChange={handleInput}
                    />
                  </label>

                  <label className='tabs__label' htmlFor="logInPassword">
                    Joriy parolingiz:
                    <input
                      onChange={handleInput}
                      type={password ? "text" : "password"}
                      name='password'
                      value={data.password}
                      id="logInPassword"
                      placeholder='password'
                      required className='tabs__input'
                      autoComplete='false'
                    />
                    <button className="tabs__btn-icon" onClick={showPassword}>
                      <FontAwesomeIcon icon={password ? faEyeSlash : faEye} className="tabs__icon" />
                    </button>
                  </label>

                  <button type="submit" disabled={loading} className="tabs__btn">
                    {loading ? "Kuting..." : toggleState === 2 && "Kirish"}
                  </button>

                </form>

              </div>

            </div>

          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}