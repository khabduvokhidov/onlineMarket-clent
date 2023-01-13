import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { useInfoContext } from "./context/InfoContext"

import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import OperatorProducts from "./components/OperatorProducts/OperatorProducts"
import Product from "./components/Product/Product"
import SalesHistory from "./components/SalesHistory/SalesHistory"
import Admin from "./pages/Admin/Admin"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import Register from "./pages/Register/Register"
import OrderProduct from "./components/OrderProduct/OrderProduct"

function App() {
  const { user } = useInfoContext()

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/register" element={ <Register /> } />
            
            {/* <Route path="/products" element={ <Products /> } /> */}
            
            <Route path="/products/product/products/one/:id" element={ <Products /> } />
            
            <Route path="product/products/one/:id" element={user ? <Product /> : <Navigate to="/register" /> } />
            <Route path="admin/product/products/:id" element={user ?  <OperatorProducts /> : <Navigate to="/register"/> } />
            <Route path="/admin" element={user?.role === "admin" && <Admin /> /* : <h2 className="error">Sizda Bu Yerga Kirish Huquqi Yo'q</h2> */ } />
            <Route path="admin/product/products/:id/order/saleshistory/:id" element={user ? <OrderProduct /> : <Navigate to="/register" /> } />
            <Route path="/saleshistory" element={user?.role === "admin" && <SalesHistory /> /* : <h2 className="error">Sizda Bu Yerga Kirish Huquqi Yo'q</h2> */ } />
        </Routes>
        <Footer />
        </Router>
    </>
  );
}

export default App;