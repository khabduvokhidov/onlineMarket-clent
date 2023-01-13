import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Products.css';
import Card from '../../components/Card/Card';
import { useInfoContext } from '../../context/InfoContext';
import { addProduct } from '../../api/productRequest';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
  const params = useParams()

  const { user, loading, setLoading, productLoading, setProductLoading, products } = useInfoContext()
  const [image, setImage] = useState(null)

  const nameRef = useRef()
  const imageRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0]
    setToBase(file);
  }

  const setToBase = (file) => {
    const render = new FileReader()
    console.log(render);
    render.readAsDataURL(file)
    render.onloadend = () => {
      setImage(render.result)
    }
  }

  const showToastError = () => {
    toast.error("Qaytadan urinib ko'ring!", {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const addProducts = async (e) => {
    e.preventDefault()
    try {
      if (user.role === "operator" || user.role === "admin") {
        setLoading(true)
        const data = new FormData()
        data.append("name", nameRef.current.value)
        data.append("price", priceRef.current.value)
        data.append("desc", descRef.current.value)
        data.append("image", imageRef.current.files[0])
        data.append("operatorId", user._id)

        await addProduct(data)
        resetShare();
        setProductLoading(!productLoading)
        setLoading(false)
        toast.success("mahsulot qoshildi")
        // toast.success("mahsulot ocrildi")
      }
    } catch (error) {
      setLoading(false)
      showToastError()
      console.log(error);
    }
  }

  const resetShare = () => {
    nameRef.current.value = "";
    priceRef.current.value = "";
    descRef.current.value = "";
    imageRef.current.value = "";
    setImage("")
  }

  let filteredProducts = []

  if (params.id) {
    filteredProducts = products.filter((product) => product.operatorId === params.id)
  } else {
    filteredProducts = products
  }

  return (
    <>
      <section className="products">
        <div className="container">

          {user?.role === "operator" || user?.role === "admin" && (
            <>
              <h2 className="products__title">Bu Yerdan Mahsulotlarni Qo'shasiz</h2>

              <div className="products__add">
                <div className="products__inputs">
                  <form onSubmit={addProducts} id="addProductsForm" className='add__form'>
                    <label htmlFor="productName" className="add__label">
                      Mahsulotning Nomi!

                      <input
                        required
                        type="text"
                        name="name"
                        id="productName"
                        className='add__input'
                        ref={nameRef}
                      />
                    </label>

                    <label htmlFor="productImage" className="add__label">
                      Mahsulotning Rasmi!

                      <input
                        required
                        type="file"
                        name="image"
                        id="productImage"
                        className='add__image add__input'
                        ref={imageRef}
                        onChange={handleImage}
                      />

                      <div
                        className='add__input-icon dis-flex'
                        style={{ color: "blue" }}
                        onClick={() => imageRef.current.click()}
                      >
                        <FontAwesomeIcon icon={faImage} className="input__icon" />
                        photo
                      </div>
                    </label>

                    <label htmlFor="productPrice" className="add__label">
                      Mahsulotning Narxi!

                      <input
                        required
                        type="number"
                        name="price"
                        id="productPrice"
                        className='add__input files'
                        ref={priceRef}
                      />
                    </label>

                    <label htmlFor="productDesc" className="add__label">
                      Mahsulot Haqida Ma'lumot!

                      <input
                        required
                        type="text"
                        name="desc"
                        id="productDesc"
                        className='add__input'
                        ref={descRef}
                      />
                    </label>

                    <button form="addProductsForm" disabled={loading} className={loading ? 'disapled' : "add__btn"}>
                      {loading ? "Kuting..." : "Mahsulotni Saqlash"}
                    </button>
                  </form>
                  {
                    image && (
                      <div className="add__preview">
                        <FontAwesomeIcon onClick={() => setImage(null)} className="add__clear" icon={faTimes} />
                        <img src={image} alt="preview" />
                      </div>
                    )
                  }
                </div>
              </div>
            </>
          )}

          {
            products.length === 0 ? (
              <h2 className="products__title">Mahsulotlar Yo'q</h2>
            ) : (
              <>
                <h2 className="products__title">Barcha Mahsulotlar</h2>

                <div className="products__cards">
                  {
                    filteredProducts?.map((product, id) => (
                      <Card
                        key={id}
                        data={product}
                      />
                    ))
                  }
                </div>
                <ToastContainer />
              </>
            )
          }

        </div>
      </section>
    </>
  )
}