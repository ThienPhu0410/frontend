// CartScreen.js

import React from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Message from '../components/Message';
import '../styles/CartScreen.css';

const QuantitySelector = ({ value, onDecrease, onIncrease, disabled, max }) => (
  <div className="d-flex align-items-center">
    <Button variant="light" onClick={onDecrease} disabled={disabled || value === 1}>
      -
    </Button>
    <div className="mx-2">{value}</div>
    <Button variant="light" onClick={onIncrease} disabled={disabled || value === max}>
      +
    </Button>
  </div>
);

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    // Ensure the quantity is within the valid range (1 to max)
    qty = Math.max(1, Math.min(qty, product.countInStock));
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (discount) {
      const discountAmount = (discount / 100) * price;
      return (price - discountAmount).toFixed(2);
    }
    return price;
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce(
        (acc, item) =>
          acc + calculateDiscountedPrice(item.price, item.discount) * item.qty,
        0
      )
      .toFixed(2);
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="cart-title">CART</h1>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty!!! <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        ${calculateDiscountedPrice(item.price, item.discount)}
                      </Col>
                      <Col md={2}>
                        <QuantitySelector
                          value={item.qty}
                          onDecrease={() => addToCartHandler(item, item.qty - 1)}
                          onIncrease={() => addToCartHandler(item, item.qty + 1)}
                                                    max={item.countInStock}
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="cart-summary-card fade-in">
          <ListGroup variant="flush">
            <ListGroup.Item className="cart-summary-title">
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item className="cart-subtotal">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): ${calculateTotalPrice()}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="place-order-button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
