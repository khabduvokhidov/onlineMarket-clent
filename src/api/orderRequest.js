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


export const addOrderProduct = (data) => API.post(`order/neworder`, data)

export const getSalesHis = (data) => API.get(`order/sales`, data)

export const delSalesHis = (id) => API.delete(`order/sales/${id}`)

export const getOrderOperatorById = (id) => API.get(`order/sales/${id}`)