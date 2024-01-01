// ForgotPasswordForm.js

import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const ForgotPasswordForm = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forgotPassword({ email }).unwrap();
      toast.success('An email with instructions has been sent to your email address.');
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='mb-3'
            style={{ display: 'block', margin: '5px auto 0' }}
          >
            Find Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordForm;
