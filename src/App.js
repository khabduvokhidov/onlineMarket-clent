import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import Products from "./pages/Products/Products";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/products" element={ <Products /> } />
        </Routes>
        <Footer />
        </Router>
    </>
  );
}

export default App;