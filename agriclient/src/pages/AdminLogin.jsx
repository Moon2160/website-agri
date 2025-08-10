import React,{ useState } from "react";
import { Container, Form, Button } from "react-bootstrap";


export default function AdminLogin() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to log in with:", formData); // ✅ Debugging before sending

    const response = await fetch("http://127.0.0.1:8000/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            email: "admin@example.com",
            password: "123" // ✅ Fixed login credentials
        }),
    });

    const data = await response.json();
    console.log("API Response:", data); // ✅ Debug Laravel response

    if (response.ok) {
        alert(`✅ Welcome, ${data.admin.name}!`);
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin-dashboard";
    } else {
        alert("❌ Login failed! Reason: " + JSON.stringify(data.errors || data.message));
    }
};






  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold text-danger">Admin Login</h2>
      <Form className="p-4 shadow-lg rounded bg-light" onSubmit={handleSubmit}>


        {/* <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" 
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
        </Form.Group>

        <Button variant="danger" className="w-100" type="submit">Login</Button>
      </Form>
    </Container>
  );
}