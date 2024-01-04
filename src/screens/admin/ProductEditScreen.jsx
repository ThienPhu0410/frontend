import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import './styles/ProductEditScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [specsInput, setSpecsInput] = useState({});

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setDiscount(product.discount);
      setSpecsInput(product.specs || {});
    }
  }, [product]);

  const handleRemoveSpec = (keyToRemove) => {
    setSpecsInput((prevSpecs) => {
      const { [keyToRemove]: removedSpec, ...restSpecs } = prevSpecs;
      return restSpecs;
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        discount,
        specsInput,
      }).unwrap();

      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      console.error('Update Product Error:', err);
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setDiscount(product.discount);
      setSpecsInput(product.specs || {});
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      console.error('Upload Image Error:', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="product-edit-screen">
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter product price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand name'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter stock count'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='discount'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='specs'>
              <Form.Label>Specifications</Form.Label>
              {Object.entries(specsInput).map(([key, value]) => (
                <div key={key} className="spec-input-container">
                  <span className="value-label">Enter key:</span>
                  <Form.Control
                    placeholder={`Enter key (e.g., CPU)`}
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value.trim();
                      setSpecsInput((prevSpecs) => {
                        const updatedSpecs = { ...prevSpecs };
                        delete updatedSpecs[key];
                        return { [newKey]: value, ...updatedSpecs };
                      });
                    }}
                  />
                  <span className="value-label">Enter value:</span>
                  <Form.Control
                    as='textarea'
                    placeholder={`Enter value `}
                    value={`${String(value || '')}`}
                    onChange={(e) => {
                      const newInputValue = e.target.value;
                      setSpecsInput((prevSpecs) => ({
                        ...prevSpecs,
                        [key]: newInputValue.replace(/"/g, ''),
                      }));
                    }}
                  />
                  <Button variant="danger" style={{ marginBottom: '10px' }} onClick={() => handleRemoveSpec(key)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>

                </div>

              ))}
              <Button variant="primary" onClick={() => setSpecsInput((prevSpecs) => ({ ...prevSpecs, [`NewKey_${Date.now()}`]: '' }))} style={{ marginLeft: '0px' }}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
