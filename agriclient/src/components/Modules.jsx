// components/Modules.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaSeedling, FaBullhorn, FaBook, FaBell, FaTools, FaShoppingBasket } from 'react-icons/fa';

const modulesLeft = [
  { icon: <FaShoppingBasket />, title: 'Farmer-to-Buyer Marketplace' },
  { icon: <FaBullhorn />, title: 'Post or Browse Listings' },
  { icon: <FaSeedling />, title: 'Seeds & Fertilizers' },
];

const modulesRight = [
  { icon: <FaTools />, title: 'Equipment Sharing Portal' },
  { icon: <FaBook />, title: 'Agri Learning Hub' },
  { icon: <FaBell />, title: 'Get Notified and Learn' },
];

export default function Modules() {
  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center fw-bold">Modules Overview</h3>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header className="bg-success text-white">Marketplace & Finance</Card.Header>
            <Card.Body>
              {modulesLeft.map((mod, idx) => (
                <div key={idx} className="d-flex align-items-center mb-3">
                  <div className="text-success me-3">{mod.icon}</div>
                  <div>{mod.title}</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header className="bg-success text-white">Learning, Tools & Alerts</Card.Header>
            <Card.Body>
              {modulesRight.map((mod, idx) => (
                <div key={idx} className="d-flex align-items-center mb-3">
                  <div className="text-success me-3">{mod.icon}</div>
                  <div>{mod.title}</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

