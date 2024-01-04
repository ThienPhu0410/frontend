// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Image, Form } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetAllProductsQuery, // Updated import
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import './styles/ProductListScreen.css';
const ProductListScreen = () => {
  // State variables
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [chartData, setChartData] = useState(null);

  // API queries and mutations
  const { data, isLoading, error, refetch } = useGetAllProductsQuery({ sortOrder });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        refetch();
        setSelectedBrand('');
        setSelectedCategory('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        setSelectedBrand('');
        setSelectedCategory('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Prepare chart data
  useEffect(() => {
    const prepareChartData = (products) => {
      const brandCount = {};
      products.forEach((product) => {
        const brand = product.brand;
        brandCount[brand] = (brandCount[brand] || 0) + 1;
      });
      const labels = Object.keys(brandCount);
      const data = Object.values(brandCount);
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Number of Products',
            data,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartData);
    };

    if (data && data.products) {
      prepareChartData(data.products);
    }
  }, [data]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Form.Control
            as='select'
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value=''>All Brands</option>
            <option value='Apple'>Apple</option>
            <option value='Lenovo'>Lenovo</option>
            <option value='ASUS'>ASUS</option>
            <option value='ACER'>ACER</option>
            <option value='ViewSonic'>VIEWSONIC</option>
            <option value='E-DRA'>E-DRA</option>
            <option value='HP'>HP</option>
          </Form.Control>
        </Col>
        <Col>
        <Form.Control
  as='select'
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className='category-select'
>
  <option value=''>All Products</option>
  <option value='Laptop'>Laptops</option>
  <option value='Screen'>Screens</option>
  <option value='PC'>PCs</option>
</Form.Control>

        </Col>
        <Col>
          <Button
            className='my-3'
            onClick={() => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))}
          >
            Sort by Price {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </Col>
        <Col className='text-end'>
        <Button
  className='my-3 create-product-btn'
  onClick={createProductHandler}
>
  <FaPlus className='plus-icon' />
  <span>Create Product</span>
</Button>

        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products
                .filter((product) =>
                  (selectedBrand ? product.brand === selectedBrand : true) &&
                  (selectedCategory ? product.category === selectedCategory : true)
                )
                .map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Image src={product.image} alt={product.name} fluid rounded width='50' />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {chartData && (
            <div>
              <h2>Products Distribution by Brand</h2>
              <Bar data={chartData} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
