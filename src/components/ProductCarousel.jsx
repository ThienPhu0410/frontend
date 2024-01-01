import React from 'react';
import { Carousel } from 'react-bootstrap';
import silder1 from '../assets/banner1.jpg';
import silder2 from '../assets/banner2.png';
import silder3 from '../assets/banner3.png';

import './ProductCarousel.css';
const images = [silder1, silder2, silder3];

const ProductCarousel = () => {
  return (
    <Carousel pause='hover' className='custom-carousel'>
      {images.map((image, index) => (
        <Carousel.Item key={index} className='custom-carousel-item'>
          <img src={image} alt={`Image ${index + 1}`} className='d-block w-100 custom-carousel-image' />
          
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
