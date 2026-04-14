import React from "react";
import { Card } from "react-bootstrap";

const ReviewList = ({ review }) => {
  return (
    <Card className="review-card border-0 h-100">
      <Card.Body>
        <div className="review-card__header">
          <h5 className="review-card__name">{review.name}</h5>
          <span className="review-card__rating">⭐ {review.rating}/5</span>
        </div>

        <p className="review-card__comment">{review.comment}</p>
      </Card.Body>
    </Card>
  );
};

export default ReviewList;