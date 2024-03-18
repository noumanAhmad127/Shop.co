import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utils/Header";
import Homepage from "./components/pages/User/Homepage";
import ProductList from "./components/pages/User/ProductList";
import Footer from "./components/utils/Footer";
import ProductDetailStatic from "./components/pages/User/productDetailPage/ProductDetailStatic";
import Carts from "./components/pages/User/Carts";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/User/Profile";
import Shipping from "./components/pages/User/Shipping";
import Payment from "./components/pages/User/Payment";
import PlaceOrder from "./components/pages/User/PlaceOrder";
import Order from "./components/pages/User/Order";
import UserList from "./components/pages/Admin/UserList";
import UserEdit from "./components/pages/Admin/UserEdit";
import ListProduct from "./components/pages/Admin/ListProduct";
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
        <Route path="/admin/userlist" Component={UserList} exact />
        <Route path="/admin/user/:id/edit" Component={UserEdit} exact />
        <Route path="/admin/productlist" Component={ListProduct} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
