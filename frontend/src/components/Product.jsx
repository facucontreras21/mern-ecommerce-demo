import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const Product = ({ product }) => {
  return (
    <Card className="product-card h-100 border-0">
      <Link to={`/product/${product._id}`} className="product-card__image-link">
        <div className="product-card__image-wrap">
          <Card.Img
            src={product.image}
            alt={product.name}
            className="product-card__image"
          />
        </div>
      </Link>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-card__title">
          <Link to={`/product/${product._id}`} className="product-card__title-link">
            {product.name}
          </Link>
        </Card.Title>

        <div className="product-card__rating">
          <Rating
            initialRating={product.ratings || 0}
            readonly
            emptySymbol={<span className="rating-star">☆</span>}
            fullSymbol={<span className="rating-star">★</span>}
            placeholderSymbol={<span className="rating-star">★</span>}
          />
          <span className="product-card__reviews">
            {product.numReviews || 0} reviews
          </span>
        </div>

        <div className="product-card__footer mt-auto">
          <span className="product-card__price">${product.price}</span>

          <Link to={`/product/${product._id}`} className="app-button app-button--small">
            Ver detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;