import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

const InfoContextProvider = ({children}) => {
  const URL = `http://localhost:4001`
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [admin, setAdmin] = useState()
  const [operator, setOperator] = useState()
  
  const value = {
    URL,
    user,
    setUser,
    token,
    setToken,
    admin,
    setAdmin,
    operator,
    setOperator,
  }

  // useEffect(() => {
  //   ;(async ()=>{
  //       const res = await axios(`${URL}/info`, {headers: {token: token  }})
  //       setUser(res.data )
  //   })()
  // }, [token, URL]);
  
  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>
        {() => children}
      </InfoContext.Consumer>
    </InfoContext.Provider>
  )
} 

export default InfoContextProvider