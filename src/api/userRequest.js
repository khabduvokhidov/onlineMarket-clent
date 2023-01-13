import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/"
})

export const getOperators = (data) => {
  const res = API.get("user/operators", data)
  return res
}

export const delUser = (id) => {
  const res = API.delete(`user/operators/${id}`)
  return res
}