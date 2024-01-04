// Trong file JSX (HomeScreen.jsx)

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Carousel } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import styles from './styles/HomeCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const HomeScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBrandLaptop, setSelectedBrandLaptop] = useState('');
  const [selectedBrandScreen, setSelectedBrandScreen] = useState('');

  useEffect(() => {
    if (data) {
      setCurrentPage(data.page);
      setTotalPages(data.pages);
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadMoreProducts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, totalPages]);

  const loadMoreProducts = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      refetch({ pageNumber: nextPage });
    }
  };

  const filterByCategoryAndBrand = (category, brand, setSelectedBrand) => {
    return data.products.filter(
      (product) => product.category === category && (!brand || product.brand === brand)
    );
  };

  const renderProductCarousel = (category, selectedBrand, setSelectedBrand) => {
    const categoryProducts = filterByCategoryAndBrand(category, selectedBrand);

    return (
      <div className={styles.renderProductCarousel}>
       
        <div className={styles.container}>
          <div className='brand-filter'>
            <label className={styles.brandFilterLabel}>Select Brand:</label>
            <select
              className={styles.brandFilterSelect}
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
              }}
            >
              <option value="">All Brands</option>
              <option value="Apple">Apple</option>
              <option value="Lenovo">Lenovo</option>
              <option value="ASUS">ASUS</option>
              <option value="ACER">ACER</option>
              <option value="ViewSonic">VIEWSONIC</option>
              <option value="E-DRA">E-DRA</option>
              <option value="HP">HP</option>
            </select>
            <Link to="/all" className={`btn btn-primary view-all`}>
            View All Products
          </Link>
          </div>     
        </div>

        <Carousel
          interval={null}
          nextIcon={<FontAwesomeIcon icon={faChevronRight} style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'darkblue' }} />}
          prevIcon={<FontAwesomeIcon icon={faChevronLeft} style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'darkblue' }} />}
        >
          {[...Array(Math.ceil(categoryProducts.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
              <div className='heading-category'>
          <h1>{category}</h1>
        </div>
                {categoryProducts.slice(index * 4, (index + 1) * 4).map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <>
      <ProductCarousel />
      <div className='left-color' >
         </div>
      <div class='right-color'>
      </div>
      {!isLoading ? (
        <div className={styles.columnColor}>
        </div>
      ) : (
        <Link to="/" className="btn btn-light mb-4 mr-2">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error && error.data && error.data.message) || error.message}
        </Message>
      ) : (
        <>
          <Meta />
          {renderProductCarousel('Laptop', selectedBrandLaptop, setSelectedBrandLaptop)}
          {renderProductCarousel('Screen', selectedBrandScreen, setSelectedBrandScreen)}
        </>
      )}
    </>
  );
};

export default HomeScreen;
