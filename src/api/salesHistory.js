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


export const addArchive = (data) => API.post(`salesHis/newsales`, data)

export const getOneArchive = (orderId) => API.get(`salesHis/newsales/one/${orderId}`)

export const getAllOrders = () => API.get(`salesHis/saleshstory`)

export const getByIOperatorId = (operatorId) => API.get(`salesHis/saleshstory/operators/${operatorId}`)

export const deleteSalesHistory = (id) => API.delete(`salesHis/saleshstory/${id}`)

export const updateSalesHistory = (salesHisId, FormData) => API.put(`salesHis/salesupdate/${salesHisId}`, FormData)

export const salesSoltOutAll = () => API.get(`salesHis/salessoltout`)