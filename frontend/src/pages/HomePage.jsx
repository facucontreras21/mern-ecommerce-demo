import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { listProducts, listProductsTop } from "../redux/actions/productActions";

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList || {};

  const productListTopRanking = useSelector(
    (state) => state.productListTopRanking
  );
  const {
    loading: topLoading,
    error: topError,
    productListTop = [],
  } = productListTopRanking || {};

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listProductsTop());
  }, [dispatch]);

  return (
    <main className="page-shell">
      <Container>
        <section className="home-hero">
          <div className="home-hero__content">
            <span className="section-kicker">Modern Tech Store</span>
            <h1 className="home-hero__title">
              Discover premium products with a cleaner shopping experience.
            </h1>
            <p className="home-hero__text">
              A full-stack ecommerce practice project built with React, Redux,
              Node.js and MongoDB.
            </p>
          </div>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Featured</span>
              <h2 className="section-title">Top rated products</h2>
            </div>
          </div>

          {topLoading ? (
            <Loader />
          ) : topError ? (
            <p className="app-muted">Could not load featured products.</p>
          ) : (
            <Row className="g-4">
              {productListTop.slice(0, 3).map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        <section className="home-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Catalog</span>
              <h2 className="section-title">Latest products</h2>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <p className="app-muted">Could not load products.</p>
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>
      </Container>
    </main>
  );
};

export default HomePage;