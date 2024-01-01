import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsByBrandQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import './styles/AllProductsScreen.css';

const AllProductsScreen = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { data, isLoading, error, refetch } = useGetProductsByBrandQuery({
    brand: selectedBrand,
    pageNumber: 1,
    sortOrder,
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedBrand, sortOrder]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <>
      <Meta title="All Product" />
      <h1>All Product</h1>
      <Row>
        <Col md={{ span:9, offset: 9 }}>
          <div className="brand-select-container">
            <label className="brand-select-label">Select Brand:</label>
            <select
              className="brand-select"
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
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
          </div>
          <div className="sort-order-container">
            <label className="sort-order-label">Sort by Price:</label>
            <select
              className="sort-order-select"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error && error.data && error.data.message) || error.message}
        </Message>
      ) : (
        <Row>
          {data.products
            .slice()
            .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price))
            .map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default AllProductsScreen;
