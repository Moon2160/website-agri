import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserPlus, FaBullhorn, FaWrench, FaChartLine } from 'react-icons/fa';

const steps = [
  { icon: <FaUserPlus size={32} />, title: 'Register as Farmer/Buyer/Admin' },
  { icon: <FaBullhorn size={32} />, title: 'Post or Browse Listings' },
  { icon: <FaWrench size={32} />, title: 'Apply for Help / Book Equipment' },
  { icon: <FaChartLine size={32} />, title: 'Performance Optimization' },
];

export default function HowItWorks() {
  return (
    <Container className="py-4" style={{ marginBottom: '50px' }}> {/* Footer-এর সাথে overlap এড়াতে */}
      <h3 className="text-center fw-bold mb-3 text-success">How It Works</h3>
      <Row className="g-4 justify-content-center">
        {steps.map((step, idx) => (
          <Col xs={12} sm={6} md={3} key={idx}>
            <Card className="text-center shadow border-0 h-100 d-flex flex-column align-items-center justify-content-center">
              <Card.Body>
                <div className="mb-2 text-success">{step.icon}</div>
                <Card.Title>{step.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}