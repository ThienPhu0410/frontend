// AllProductsScreen.jsx

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsByBrandQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import './styles/AllProductsScreen.css';

const AllProductsScreen = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error, refetch } = useGetProductsByBrandQuery({
    brand: selectedBrand,
    pageNumber,
    sortOrder,
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedBrand, sortOrder, pageNumber]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setPageNumber(1); // Reset page number when brand changes
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <Meta title="All Product" />
      <h1>All PRODUCT</h1>
      <Row>
        <Col md={{ span: 9, offset: 3 }}>
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

      {/* Pagination controls */}
      <Paginate
        currentPage={pageNumber}
        totalPages={data?.pages}
        onPageChange={handlePageChange}
      />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error && error.data && error.data.message) || error.message}
        </Message>
      ) : (
        <Row>
          {data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination controls */}
      <Paginate
        currentPage={pageNumber}
        totalPages={data?.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AllProductsScreen;
