import React, { useState, useEffect } from 'react';
import './Slider.css'

function Slider() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=12')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === users.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? users.length - 1 : prevIndex - 1));
  };

  return (
    <div className="slider-outer-part">
      <h1>Images Slider</h1>

      <div className="slider-mian-part">
        <button onClick={prevSlide}>&lt;</button>
        <img src={users.length > 0 && users[currentIndex].picture.large} alt="user" />
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
}

export default  Slider;
