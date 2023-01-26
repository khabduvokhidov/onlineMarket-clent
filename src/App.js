import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { useInfoContext } from "./context/InfoContext"

import Footer from "./components/Footer/Footer"
import OperatorProducts from "./components/OperatorProducts/OperatorProducts"
import Product from "./components/Product/Product"
import SalesHistory from "./components/SalesHistory/SalesHistory"
import Admin from "./pages/Admin/Admin"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import Register from "./pages/Register/Register"
import OrderProduct from "./components/OrderProduct/OrderProduct"
import DeliveredOrders from "./pages/DeliveredOrders/DeliveredOrders"
import AcceptedOrders from "./pages/AcceptedOrders/AcceptedOrders"
import SalesOne from "./components/SalesOne/SalesOne"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const { user } = useInfoContext()

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />

          <Route path="/register" element={ <Register /> } />

          <Route path="/products" element={ <Products /> } />

          <Route path="product/products/one/:id" element={ user ? <Product /> : <Navigate to="/register" /> } />

          <Route path="admin/salesHis/saleshstory/operators/:operatorId" element={ user ? <OperatorProducts /> : <Navigate to="/register"/> } />

          <Route path="/admin" element={ user?.role === "admin" && <Admin /> } />

          <Route path="admin/product/products/:id/order/sales/:id" element={ user ? <OrderProduct /> : <Navigate to="/register" /> } />
    
          <Route path="/sales" element={ user?.role === "admin" || user?.role === "operator" ? <SalesHistory /> : <h2 className="error">Sizda Bu Yerga Kirish Huquqi Yo'q</h2> } />

          <Route path="/salesHis/newsales/one/:orderId" element={ user?.role === "admin" || user?.role === "operator" ? <SalesOne /> : <h2 className="error">Sizda Bu Yerga Kirish Huquqi Yo'q</h2> } />

          <Route path="/acceptedorders" element={ user?.role === "admin" || user?.role === "operator" ? <AcceptedOrders /> : <h2 className="error">Sizda Bu Yerga Kirish Huquqi Yo'q</h2> } />

          <Route path="/deliveredorders" element={ <DeliveredOrders /> } />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;