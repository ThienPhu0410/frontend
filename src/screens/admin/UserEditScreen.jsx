// UserEditScreen.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import axios from 'axios';
import './styles/UserEditScreen.css'; 

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/api/users/${userId}`);

        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setImage(data.avatar || ''); // Assuming 'avatar' is the property for the user's image

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.put(`/api/users/${userId}`, {
        name,
        email,
        isAdmin,
        avatar: image, // Assuming 'avatar' is the property for the user's image
      });

      console.log('User updated successfully:', data);
      navigate('/admin/userlist');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setLoadingUpload(true);

        const { data } = await axios.post('/api/upload', formData);

        setImage(data.image);

        setLoadingUpload(false);
      } catch (error) {
        setLoadingUpload(false);
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Avatar Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter avatar image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                label='Choose Avatar Image'
                onChange={uploadFileHandler}
                type='file'
              />
              {loadingUpload && <Loader />}
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
