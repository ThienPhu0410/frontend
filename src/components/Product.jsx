import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import './styles/Product.css';

const Product = ({ product }) => {
  const cardStyle = {
    marginBottom: '5px',
    height: '90%',
    position: 'relative',
  };

  const discountStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff0000',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px',
    fontSize: '14px',
    zIndex: '1',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
  };

  if (!product) {
    return null;
  }

  // Calculate discounted price
  const discountedPrice =
    product.discount !== undefined && product.discount !== null
      ? (product.price * (100 - product.discount)) / 100
      : null;

  return (
    <Card style={cardStyle} className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-image" />
      </Link>

      <Card.Body>
        {/* Discount */}
        {product.discount !== undefined && product.discount !== null && product.discount > 0 && (
          <div style={discountStyle}>{`${product.discount}% OFF`}</div>
        )}

        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />

          {/* Display price information */}
          {product.discount !== undefined && product.discount !== null && product.discount > 0 ? (
            <div className="product-price">
              <span className="discounted-price" style={{ marginRight: '5px' }}>
                ${discountedPrice.toFixed(2)}
              </span>
              {product.price && (
                <span className="original-price" style={{ textDecoration: 'line-through', color: '#999' }}>
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          ) : (
            // Display regular price if there's no discount
            product.price && (
              <div className="product-price">${product.price.toFixed(2)}</div>
            )
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
