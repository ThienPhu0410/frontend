import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { ListGroup } from 'react-bootstrap';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const calculateDiscountedPrice = (price, discount) => {
    if (typeof price !== 'number' || typeof discount !== 'number') {
      return 0;
    }

    if (discount) {
      const discountAmount = (discount / 100) * price;
      return (price - discountAmount).toFixed(2);
    }
    return price.toFixed(2);
  };

  const placeOrderHandler = async () => {
    try {
      console.log('Placing order...');

      // Check if all order items have a valid _id
      const areOrderItemsValid = cart.cartItems.every((item) => item._id);

      if (!areOrderItemsValid) {
        console.error('Invalid order items: Some items have undefined _id');
        toast.error('Invalid order items: Some items have undefined _id');
        return;
      }

      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          _id: item._id,
          product: item.product,
          name: item.name,
          qty: item.qty,
          price: calculateDiscountedPrice(item.price, item.discount),
          image: item.image,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (!res._id) {
        console.error('Order creation failed: Invalid response from server');
        toast.error('An error occurred while placing the order. Please try again.');
        return;
      }

      console.log('Order created successfully:', res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
              <p style={{ marginBottom: '0' }}>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </Card.Body>
          </Card>

          {cart.paymentMethod === 'CashOnDelivery' && (
            <Card className="mt-3">
              <Card.Body>
                <h2>Payment Method</h2>
                <strong>Method: Cash On Delivery</strong>
              </Card.Body>
            </Card>
          )}

          <Card className="mt-3">
            <Card.Body>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <Card>
                  {cart.cartItems.map((item, index) => (
                    <Card.Body key={index} className="border-bottom">
                      <Row>
                        <Col md={2}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid"
                          />
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </Card.Body>
                  ))}
                </Card>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h2>Order Summary</h2>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items Price</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && (
                    <Message variant='danger'>{error.data.message}</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                <Button
  type='button'
  className='btn btn-block mx-auto btn-lg' // Added mx-auto class for horizontal centering and btn-lg for larger size
  disabled={cart.cartItems === 0}
  onClick={placeOrderHandler}
  style={{ width: '100%',alignItems:'center' }} // Added inline style for a custom width (adjust as needed)
>
  Place Order
</Button>     {isLoading && <Loader />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
