import { createContext, useContext, useEffect, useState } from 'react'
import { getAllProducts } from '../api/productRequest'
import { getSalesHis } from '../api/orderRequest'
import { getOperators } from '../api/userRequest'
import { getAllOrders, getByIOperatorId, salesSoltOutAll } from '../api/salesHistory'


const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

const InfoContextProvider = ({ children }) => {
  const serverPublic = "https://onlinemarket.onrender.com/"

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")) || null)

  const [loading, setLoading] = useState(false)

  const [productLoading, setProductLoading] = useState(true)

  const [products, setProducts] = useState([])

  const [order, setOrder] = useState([])

  const [operators, setOperators] = useState([])

  const [orders, setOrders] = useState([])

  const [delivered, setDelivered] = useState([])


  // get products
  useEffect(() => {
    ;(async () => {
      const {
        data
      } = await getAllProducts()
      setProducts(data)
    })()
  }, [user, productLoading])

  // get order product
  useEffect(() => {
    ;(async () => {
      const {
        data
      } = await getSalesHis()
      setOrder(data)
    })()
  }, [user, productLoading])

  //get operators/users
  useEffect(() => {
    ;(async () => {
      const {
        data
      } = await getOperators()
      setOperators(data)
    })()

  }, [user, productLoading])

  //get orders
  useEffect(() => {
    ;(async () => {
      const {
        data
      } = await getAllOrders()
      setOrders(data)
    })()

  }, [user, productLoading])

  //get all sales solt out
  useEffect(() => {
    ;(async () => {
      const {
        data
      } = await salesSoltOutAll()
      setDelivered(data)
    })()
  }, [user, productLoading])


  const value = {
    serverPublic,
    user,
    setUser,
    loading,
    setLoading,
    productLoading,
    setProductLoading,
    products,
    setProducts,
    order,
    setOrder,
    operators,
    setOperators,
    orders,
    setOrders,
    delivered,
    setDelivered
  }

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>
        {() => children}
      </InfoContext.Consumer>
    </InfoContext.Provider>
  )
}

export default InfoContextProvider