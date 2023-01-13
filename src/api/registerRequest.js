import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/"
})

export const logIn = (FormData) => {
  const res = API.post("user/login", FormData)
  return res
}

export const signUp = (FormData) => {
  const res = API.post("user/signup", FormData)
  return res
}