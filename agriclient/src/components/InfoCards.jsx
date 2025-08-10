
// components/InfoCards.jsx
import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { FaTractor, FaHandHoldingUsd, FaTools } from 'react-icons/fa';
import { GiPlantRoots } from 'react-icons/gi';

const infoItems = [
  { icon: <FaTractor size={32} />, title: 'Farmer-to-Buyer Marketplace' },
  { icon: <GiPlantRoots size={32} />, title: 'Seeds & Fertilizers' },
  { icon: <FaHandHoldingUsd size={32} />, title: 'Financial Assistance' },
  { icon: <FaTools size={32} />, title: 'Equipment Sharing' },
];

export default function InfoCards() {
  return (
    <Container className="my-5">
      <Row className="text-center g-4">
        {infoItems.map((item, idx) => (
          <Col md={3} sm={6} key={idx}>
            <Card className="h-100 shadow border-0">
              <Card.Body>
                <div className="mb-3 text-success">{item.icon}</div>
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
