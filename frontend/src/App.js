import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utils/Header";
import Homepage from "./components/pages/Homepage";
import ProductList from "./components/pages/ProductList";
import Footer from "./components/utils/Footer";
import ProductDetailStatic from "./components/pages/productDetailPage/ProductDetailStatic";
import Carts from "./components/pages/Carts";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import Shipping from "./components/pages/Shipping";
import Payment from "./components/pages/Payment";
import PlaceOrder from "./components/pages/PlaceOrder";
import Order from "./components/pages/Order";
// import { Router } from "express";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Homepage} exact />
        <Route path="/login" Component={Login} exact />
        <Route path="/signup" Component={SignUp} exact />
        <Route path="/profile" Component={Profile} exact />
        <Route path="/products" Component={ProductList} />
        <Route path="/products/:id" Component={ProductDetailStatic} exact />
        <Route path="/cart/:id?" Component={Carts} exact />
        <Route path="/shipping" Component={Shipping} exact />
        <Route path="/payment" Component={Payment} exact />
        <Route path="/placeorder" Component={PlaceOrder} exact />
        <Route path="/order/:id" Component={Order} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
