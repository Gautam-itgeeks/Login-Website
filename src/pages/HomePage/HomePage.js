import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./HomePage.css";

const HomePage = () => {


  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [visibleProducts, setVisibleProducts] = useState(6); 

  const productAPI = "https://freetestapi.com/api/v1/products";

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };



  useEffect(() => {
    fetch(productAPI)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      }); 

  }, []);

  
  

  let sortedProducts = [...allProducts];

  if (sortOrder === "Ascending") {
    sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else {
    sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const filteredProducts = sortedProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        priceFilter === "" ||
        parseFloat(product.price) <= parseFloat(priceFilter)
    );

  const loadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 6);
  };

  return (
    <div className="all-products-home-page">
      <div className="Show-all-products">
        <h1>All Products are Available Here</h1>
      </div>

      <div className="all-product-are-avilable">
        <div className="homepageinputone">
          <input
            style={{
              height: "30px",
              width: "200px",
              outline: "0px",
              border: "1px solid rgb(165, 164, 164)",
            }}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            maxLength={15}
            minLength={1}
            onChange={handleSearch}
          />
        </div>
        <div className="homepageinputone">
          <input
            minLength={1}
            maxLength={10}
            type="text"
            placeholder="Search by price"
            value={priceFilter}
            onChange={handlePriceFilter}
          />
        </div>
        <div className="homepageinputtwo">
          <select
            name="sortOrder"
            id="sortOrder"
            onChange={handleSortOrderChange}
          >
            <option value="Ascending">Ascending order</option>
            <option value="Descending">Descending Order</option>
          </select>
        </div>
      </div>

      <div  
       style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around',
        flexWrap:'wrap', marginTop:'30px', gap:'10px'}}
      className="product-grid">
        {filteredProducts.slice(0, visibleProducts).map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className="load-more">
          <h4 style={{color:'blue', textDecoration:'underline'}} onClick={loadMore}>Load More</h4>
        </div>
      )} 
    </div>
  );
};

export default HomePage;
