// Product component
import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div className="products-outer-one">
     <Link  to={`/SingelProduct/${props?.product.id}`} >
     <div className="product-image">
     <img src={props.product.image} alt={props.product.name} />
   </div>
   
   <div className="product-details">
     <h2 className="product-title">{props.product.name.substring(0, 20)}</h2>
     <p className="product-description">
       {props.product.description.substring(0, 20)}
     </p>
     <p className="product-category">
       <strong>Category:</strong> {props.product.brand.substring(0, 20)}
     </p>
     <div className="product-rating">
       <stong>Rating:</stong> {props.product.rating}
     </div>
     <p className="product-price">
       <p>Price: ${props.product.price} </p>
     </p>
   </div>
     </Link>
    </div>
  );
};

export default Product;
