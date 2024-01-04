// LoginScreen.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useLoginMutation, useForgotPasswordMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import ForgotPasswordForm from './ForgotPasswordForm';
import '../styles/LoginScreen.css'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openForgotPasswordModal = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  return (
    <FormContainer>
      <h1 className='mb-4 text-center font-weight-bold' style={{ color: '#ff4f81' }}>
        LOGIN
      </h1>

      <Form onSubmit={submitHandler} className='login-form'>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label><FaEnvelope /> Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='mb-3'>
          <Form.Label><FaLock /> Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='password-input'
            />
            <div className='password-toggle-container'>
              <Form.Check
                type='checkbox'
                id='showPassword'
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className='password-toggle-checkbox'
              />
              <Form.Label className='password-toggle-label'>Show Password</Form.Label>
            
            </div>
          </InputGroup>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary' className='mb-3'>
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3 d-flex justify-content-center align-items-center'>
        <Col className='text-center'>
          Don't have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register now
          </Link>
        </Col>
      </Row>

      <Row className='py-2 d-flex justify-content-center align-items-center forgot-password-container'>
  <Col className='text-center'>
    <span
      className='forgot-password-link'
      onClick={() => {
        openForgotPasswordModal();
        document.querySelector('.forgot-password-link').classList.add('clicked');
      }}
    >
      Forgot Password?
    </span>
  </Col>
</Row>

      <ForgotPasswordForm
        show={showForgotPassword}
        handleClose={closeForgotPasswordModal}
      />
    </FormContainer>
  );
};

export default LoginScreen;
