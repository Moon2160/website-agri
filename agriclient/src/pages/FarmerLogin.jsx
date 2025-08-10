import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function FarmerLogin() {
    const [formData, setFormData] = useState({ phone: "", password: "" });


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending Data:", formData); // 🔍 Debugging



        const response = await fetch("http://127.0.0.1:8000/api/farmer-login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(formData),
          
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
            console.log("API Data:", data);
            alert(`✅ Welcome, Farmer!`);
            localStorage.setItem("farmer-token", data.token); // ✅ Store token
            localStorage.setItem("farmer-name", data.farmer?.name || data.user_name || data.full_name || data.first_name || data.name || "Unknown Farmer");
            window.location.href = "/farmer-dashboard"; // ✅ Redirect to dashboard
        } else {
            alert("❌ Login failed! Reason: " + JSON.stringify(data.errors || data.message));
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center fw-bold text-success">Farmer Login</h2>
            <Form className="p-4 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter your phone number"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </Form.Group>

                <Button variant="success" className="w-100" type="submit">Login</Button>
            </Form>
        </Container>
    );
}