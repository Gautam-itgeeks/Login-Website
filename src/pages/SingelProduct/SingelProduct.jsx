import React, { useState, useEffect } from "react";
import "./SingelProduct.css";
import { useNavigate, useParams } from "react-router-dom";

const SingelProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://freetestapi.com/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="singel-product-outer">
      <div className="singel-page-left-side">
        <img src={product && product.image} alt={product && product.name} />
      </div>

      <div className="singel-page-right-side-detail">
        {product && (
          <div className="singel-product-page-outer">
            <h1 style={{fontSize:'30px', fontFamily:'"Noto Serif", serif', color:'black',
             letterSpacing:'4px',marginBottom:'10px'}} >Product: {product.name}</h1>

            <p  style={{fontSize:'27px', fontFamily:'Vesper Libre", serif', color:'black',
            letterSpacing:'3px',marginBottom:'10px'}}>{product.description}</p>

            <p style={{fontSize:'20px', fontFamily:'serif', color:'black',
            letterSpacing:'2px',marginBottom:'10px'}} >Brand Name: {product.brand}</p>

            <p>Product Rating: {product.rating}</p>

            <p  style={{fontSize:'20px', fontFamily:'serif', color:'black',
            letterSpacing:'2px',marginBottom:'10px'}} >Product Price: {product.price}</p>

            <p  style={{fontSize:'20px', fontFamily:'serif', color:'black',
            letterSpacing:'2px',marginBottom:'10px'}} >Color : {product.color}</p>

            <button  className="single-page-product-outer-button" onClick={() => navigate('/HomePage') } ><p>Back To Home Page</p></button>
            <p onClick={() => navigate('/Slider')} >Image Slider</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default SingelProduct;
