// components/InfoCards.jsx
import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { FaTractor, FaHandHoldingUsd, FaTools } from 'react-icons/fa';
import { GiPlantRoots } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const infoItems = [
  { icon: <FaTractor size={32} />, title: 'Farmer-to-Buyer Marketplace', route: '/marketplace' },
  { icon: <GiPlantRoots size={32} />, title: 'Seeds & Fertilizers', route: '/seeds-fertilizer' },
  { icon: <FaHandHoldingUsd size={32} />, title: 'Financial Assistance', route: '/financial-assistance' },
  { icon: <FaTools size={32} />, title: 'Equipment Sharing', route: '/equipment-sharing' },
];

export default function InfoCards() {
  const navigate = useNavigate();
  
  const handleCardClick = (item) => {
    console.log('Card clicked:', item.title);
    console.log('Route:', item.route);
    console.log('Current location:', window.location.pathname);
    
    if (item.route) {
      try {
        navigate(item.route);
        console.log('Navigation attempted to:', item.route);
        
        // Navigation এর পর URL check করুন
        setTimeout(() => {
          console.log('New location after navigation:', window.location.pathname);
        }, 100);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.log('No route defined for this card');
    }
  };

  return (
    <Container className="my-5">
      <Row className="text-center g-4">
        {infoItems.map((item, idx) => (
          <Col md={3} sm={6} key={idx}>
            <Card
              className="h-100 shadow border-0"
              onClick={() => handleCardClick(item)}
              style={{ 
                transition: '0.3s', 
                cursor: item.route ? 'pointer' : 'default',
                border: item.route ? '2px solid transparent' : '1px solid #ddd'
              }}
              onMouseEnter={(e) => {
                if (item.route) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.border = '2px solid #28a745';
                }
              }}
              onMouseLeave={(e) => {
                if (item.route) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.border = '2px solid transparent';
                }
              }}
            >
              <Card.Body>
                <div className="mb-3 text-success">{item.icon}</div>
                <Card.Title>{item.title}</Card.Title>
                {item.route && (
                  <small className="text-muted">Click to navigate</small>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}