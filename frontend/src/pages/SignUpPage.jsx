import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("REGISTER DATA:", {
      name,
      email,
      password,
    });
  };

  return (
    <main className="page-shell">
      <Container>
        <section className="auth-shell">
          <span className="section-kicker">Create account</span>

          <h1 className="auth-title">Sign Up</h1>

          <p className="auth-subtitle">
            Build your account to start shopping.
          </p>

          <Form onSubmit={submitHandler} className="auth-form">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="app-button">
              Create account
            </Button>
            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </Form>
        </section>
      </Container>
    </main>
  );
};

export default SignUpPage;