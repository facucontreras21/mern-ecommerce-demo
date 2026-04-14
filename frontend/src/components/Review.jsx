import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createReviewAction } from "../redux/actions/product/productActions";

const ratings = [
  { value: "1", name: "1. Malo" },
  { value: "2", name: "2. Regular" },
  { value: "3", name: "3. Bueno" },
  { value: "4", name: "4. Muy bueno" },
  { value: "5", name: "5. Excelente" },
];

const Review = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [dataReview, setDataReview] = useState({
    rating: "5",
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert("You need to log in before submitting a review.");
      return;
    }

    dispatch(createReviewAction(user.token, dataReview, id));

    setDataReview({
      rating: "5",
      comment: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="review-form-card">
      <h3 className="review-form-card__title">Write a review</h3>
      <p className="review-form-card__text">
        Share your experience with this product.
      </p>

      <Form onSubmit={handleSubmit} className="review-form">
        <Form.Group className="mb-3" controlId="reviewRating">
          <Form.Label className="review-form__label">Rating</Form.Label>
          <Form.Select
            name="rating"
            value={dataReview.rating}
            onChange={handleChange}
            className="review-form__control"
          >
            {ratings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="reviewComment">
          <Form.Label className="review-form__label">Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="comment"
            placeholder="Tell us what you liked or disliked..."
            value={dataReview.comment}
            onChange={handleChange}
            className="review-form__control"
          />
        </Form.Group>

        <Button className="app-button w-100" type="submit">
          Send review
        </Button>
      </Form>
    </div>
  );
};

export default Review;