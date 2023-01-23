import axios from "axios";

const API = axios.create({
  baseURL: "https://onlinemarket.onrender.com/"
})

export const logIn = (FormData) => {
  const res = API.post("user/login", FormData)
  return res
}

export const signUp = (FormData) => {
  const res = API.post("user/signup", FormData)
  return res
}