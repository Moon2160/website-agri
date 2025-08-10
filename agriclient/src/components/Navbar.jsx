import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // ✅ React Router Link ইমপোর্ট করা হয়েছে

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">AgriConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Login" id="login-dropdown">
              <NavDropdown.Item as={Link} to="/login/admin">Admin Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login/buyer">Buyer Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login/farmer">Farmer Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}