import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Rating from "react-rating";

import { useDispatch, useSelector } from "react-redux";
import { productById } from "../redux/actions/productActions";

import Review from "../components/Review";
import ReviewList from "../components/ReviewList";
import Loader from "../components/Loader";

const ProductPage = () => {
  const dispatch = useDispatch();

  const productFoundById = useSelector((state) => state.productFoundById);
  const { loading, error, productByIdFound = {} } = productFoundById;

  const { id } = useParams();

  useEffect(() => {
    dispatch(productById(id));
  }, [dispatch, id]);

  return (
    <main className="page-shell">
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="app-muted">{error}</p>
        ) : (
          <>
            {/* PRODUCT SECTION */}
            <Row className="g-4 align-items-start mb-5">
              {/* IMAGE */}
              <Col lg={5}>
                <div className="product-image-wrap">
                  <img
                    className="w-100 product-image"
                    src={productByIdFound?.image}
                    alt={productByIdFound?.name}
                  />
                </div>
              </Col>

              {/* PRODUCT INFO */}
              <Col lg={4}>
                <div className="product-info-block">
                  <h1 className="product-title">{productByIdFound?.name}</h1>

                  <div className="product-rating mb-3">
                    <Rating
                      placeholderRating={productByIdFound?.ratings}
                      readonly
                      emptySymbol={<span className="star">☆</span>}
                      fullSymbol={<span className="star">★</span>}
                      placeholderSymbol={<span className="star">★</span>}
                    />
                  </div>

                  <h3 className="product-price mb-3">
                    ${productByIdFound?.price}
                  </h3>

                  <p className="product-description">
                    {productByIdFound?.description}
                  </p>
                </div>
              </Col>

              {/* PURCHASE CARD */}
              <Col lg={3}>
                <div className="purchase-card-wrap">
                  <Card className="purchase-card p-3">
                    <Row className="mb-2">
                      <Col>Price:</Col>
                      <Col className="text-end">
                        <strong>${productByIdFound?.price}</strong>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>Status:</Col>
                      <Col className="text-end">
                        {productByIdFound?.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>

                    <Button
                      className="app-button w-100"
                      disabled={productByIdFound?.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </Card>
                </div>
              </Col>
            </Row>

            {/* REVIEWS FULL WIDTH */}
            <section className="reviews-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">Feedback</span>
                  <h2 className="section-title">Customer Reviews</h2>
                </div>
              </div>

              {productByIdFound?.reviews?.length ? (
                <Row className="g-4 mb-5">
                  {productByIdFound.reviews.map((review) => (
                    <Col key={review._id} md={6} lg={4}>
                      <ReviewList review={review} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="app-muted mb-5">No reviews yet.</p>
              )}
            </section>

            {/* REVIEW FORM FULL WIDTH */}
            <section className="review-form-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">Write</span>
                  <h2 className="section-title">Leave a Review</h2>
                </div>
              </div>

              <div className="review-form-wrap">
                <Review />
              </div>
            </section>
          </>
        )}
      </Container>
    </main>
  );
};

export default ProductPage;