import { React, useState } from 'react';
import "./Register.css";

export default function Register() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
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
                <form className="tabs__form" >
                  <label className='tabs__label' htmlFor="name">
                    Ism:
                    <input type="text" name='register' id="name" placeholder='Palonchi' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="surname">
                    Familiya:
                    <input type="text" name='register' id="surname" placeholder='Pistonchiyev' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="phone">
                    Nomeringizni kiriting:
                    <input type="number" name='register' id="phone" placeholder='998901234567' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="mail">
                    E-mail Kiriting:
                    <input type="email" name='register' id="mail" placeholder='user24@gmail.com' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="code">
                    Parolingiz:
                    <input type="password" name='register' id="code" placeholder='1234' required className='tabs__input' />
                  </label>
                  <label htmlFor="role" className="tabs__label">
                    Rolingizni tanlang:
                    <select name="role" id="role" className="tabs__select">
                      <option value="user">User</option>
                    </select>
                  </label>
                  <button type="submit" className="tabs__btn">Ro’yxatdan o’tish</button>
                </form>
              </div>
              <div className={toggleState === 2 ? 'tabs__content active' : 'tabs__content'}>
                <form className="tabs__form">
                  <label className='tabs__label' htmlFor="email">
                    E-mail:
                    <input type="email" name='kirish' id="email" placeholder='user24@gmail.com' required className='tabs__input' />
                  </label>
                  <label className='tabs__label' htmlFor="password">
                    Joriy parolingiz:
                    <input type="password" name='kirish' id="password" placeholder='1234' required className='tabs__input' />
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