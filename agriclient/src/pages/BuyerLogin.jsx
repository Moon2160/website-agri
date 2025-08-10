import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function BuyerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const cleanData = {
      email: formData.email.trim(),
      password: formData.password.trim()
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/buyer-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(cleanData)
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        localStorage.setItem("buyer-token", data.token);
        window.location.href = "/buyer-dashboard";
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold text-success">Buyer Login</h2>

      <Form className="p-4 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="mt-2"
            onChange={(e) => setShowPassword(e.target.checked)}
          />
        </Form.Group>

        <Button variant="success" className="w-100" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
    </Container>
  );
}