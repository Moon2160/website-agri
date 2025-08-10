import React from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link ইমপোর্ট করা হয়েছে
import { Button } from "react-bootstrap";

export default function HeroSection() {
  return (
    <div
      className="hero-section text-white py-5"
      style={{
        position: "relative",
        backgroundImage: 'url("https://www.indiabusinesstrade.in/wp-content/uploads/2024/05/farming.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Black Transparent Overlay
        }}
      ></div>

      <div className="container text-center position-relative" style={{ zIndex: 1 }}>
        <h1 className="display-4 fw-bold">
          Empowering Farmers.<br />Connecting Markets.<br />Growing Together
        </h1>
        <p className="lead mt-3">Buy, Sell, Learn, and Share – All in One Platform</p>
        <div className="mt-4">
          <Button variant="success" className="me-3">
            <Link to="/register/farmer" style={{ textDecoration: "none", color: "white" }}>
              Register as Farmer
            </Link>
          </Button>
          <Button variant="outline-light">
            <Link to="/register/buyer" style={{ textDecoration: "none", color: "white" }}>
              Register as Buyer
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}