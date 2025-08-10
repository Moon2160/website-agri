import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function FarmerRegister() {
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", formData); // 🔍 Debugging

    const response = await fetch("http://127.0.0.1:8000/api/register-farmer", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("API Response:", data); // 🔍 Check Laravel response

    if (response.ok) {
        alert("✅ Registration successful!");
    } else {
        alert("❌ Registration failed: " + JSON.stringify(data.errors));
    }
};
  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold text-success">Farmer Registration</h2>
      <Form className="p-4 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Enter your phone number"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        </Form.Group>

        <Button variant="success" className="w-100" type="submit">Register</Button>
      </Form>
    </Container>
  );
}