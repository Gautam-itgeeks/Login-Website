


import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import SignUp from "./pages/SignUp/SignUp";
import SingelProduct from "./pages/SingelProduct/SingelProduct";
import PrivateComponent from "./pages/PrivateComponent";
import Slider from "./pages/Slider/Slider";
import { useNavigate } from "react-router-dom";

function App() {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate('/')
  }

  return (
    <div className="App">
  
{
  token && 
  <h4  style={{position:'absolute', right:'20px',top:'0px', color:'blue', letterSpacing:'1px', textDecoration:'underline',
       }} onClick={logout}>LogOut</h4>
}

      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/SingelProduct/:id" element={<SingelProduct />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Slider" element={<Slider />} />
        </Route>
        <Route
          path="/Login"
          element={<Login/>}
        />
        <Route path="/" element={<SignUp />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

