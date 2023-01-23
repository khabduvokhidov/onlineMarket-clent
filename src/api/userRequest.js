import axios from "axios";

const API = axios.create({
  baseURL: "https://onlinemarket.onrender.com/"
})

export const getOperators = (data) => {
  const res = API.get("user/operators", data)
  return res
}

export const delUser = (id) => {
  const res = API.delete(`user/operators/${id}`)
  return res
}