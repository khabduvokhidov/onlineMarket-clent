import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useInfoContext } from '../../infoContext/InfoContext';

import "./Register.css";

export default function Register() {
  const navigate = useNavigate()
  
  const { URL, setToken } = useInfoContext()

  const [user, setUser] = useState({
    name: "",
    surname: "",
    phone: "",
    signUpEmail: "",
    signUpPassword: "",
    role: ""
  })
  const handleSignUp = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const signUp = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${URL}/register`, user)
      alert(res.data);
    } catch (error) {
      alert(error.massage);
    }
  }
  
  const [users, setUsers] = useState({
    logInEmail: "",
    logInPassword: ""
  })
  const handleLogIn = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const logIn = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${URL}/register`, user)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        navigate("/")
      } else {
        alert(res.data)
      }
    } catch (error) {
      alert(error.massage);
    }
  }

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  }
  
  const [password, setPassword] = useState(false)
  const showPassword = () => {
    setPassword(!password)
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
                Ro’yxatdan o’tish
              </h2>
              <h2
                className={toggleState === 2 ? 'tabs__title active' : 'tabs__title'}
                onClick={() => toggleTab(2)}>
                Tizimga kirish
              </h2>
            </div>
            <div className="tabs__contents">
              <div className={toggleState === 1 ? 'tabs__content active' : 'tabs__content'}>
                <form className="tabs__form" onSubmit={signUp}>
                  <label className='tabs__label' htmlFor="name">
                    Ism:
                    <input onChange={handleSignUp} type="text" name='signUp' id="name" placeholder='Palonchi' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="surname">
                    Familiya:
                    <input onChange={handleSignUp} type="text" name='signUp' id="surname" placeholder='Pistonchiyev' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="phone">
                    Nomeringizni kiriting:
                    <input onChange={handleSignUp} type="number" name='signUp' id="phone" placeholder='998901234567' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="signUpEmail">
                    E-mail Kiriting:
                    <input onChange={handleSignUp} type="email" name='signUp' id="signUpEmail" placeholder='username24@gmail.com' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="signUpPassword">
                    Parolingiz:
                    <input onChange={handleSignUp} type={password ? "text" : "password"} name='signUp' id="signUpPassword" placeholder='1234' required className='tabs__input' />
                    <button className="tabs__btn-icon" onClick={showPassword}>
                      <FontAwesomeIcon icon={password ? faEyeSlash : faEye} className="tabs__icon" />
                    </button>
                  </label>
                  <label htmlFor="role" className="tabs__label">
                    Rolingizni tanlang:
                    <select onChange={handleSignUp} defaultValue={"user"} name="signUp" id="role" className="tabs__select">
                      <option value="operator">Operator</option>
                      <option value="user">User</option>
                    </select>
                  </label>
                  <button type="submit" className="tabs__btn">Ro’yxatdan o’tish</button>
                </form>
              </div>
              <div className={toggleState === 2 ? 'tabs__content active' : 'tabs__content'}>
                <form className="tabs__form" onSubmit={logIn}>
                  <label className='tabs__label' htmlFor="logInEmail">
                    E-mail:
                    <input onChange={handleLogIn} type="email" name='logIn' id="logInEmail" placeholder='user24@gmail.com' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="logInPassword">
                    Joriy parolingiz:\
                    <input onChange={handleLogIn} type={password ? "text" : "password"} name='logIn' id="logInPassword" placeholder='1234' required className='tabs__input' />
                    <button className="tabs__btn-icon" onClick={showPassword}>
                      <FontAwesomeIcon icon={password ? faEyeSlash : faEye} className="tabs__icon" />
                    </button>
                  </label>
                  <button type="submit" className="tabs__btn">Kirish</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}