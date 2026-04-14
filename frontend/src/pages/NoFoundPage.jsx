import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="page-shell">
      <Container>
        <section className="not-found-shell">

          <h1 className="not-found-code">404</h1>

          <h2 className="not-found-title">Page not found</h2>

          <p className="not-found-text">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link to="/" className="app-button">
            Back to home
          </Link>

        </section>
      </Container>
    </main>
  );
};

export default NotFoundPage;