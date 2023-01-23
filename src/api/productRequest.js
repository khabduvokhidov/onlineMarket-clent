import axios from "axios";

const API = axios.create({
  baseURL: "https://onlinemarket.onrender.com/"
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.token = localStorage.getItem("token")
  }

  return req
})

export const addProduct = (data) => API.post(`product/newproduct`, data)

export const getAllProducts = () => API.get(`product/products`)

// export const getAllOperators = (operatorId) => API.get(`product/products/${operatorId}`)

export const deleteProducts = (id) => API.delete(`product/products/${id}`)

export const getByIdProducts = (id) => API.get(`product/products/one/${id}`)