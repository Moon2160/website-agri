// components/seedFertilizer/SeedsFertilizersDashboard.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SeedsFertilizersDashboard = () => {
  // Component load হচ্ছে কিনা test করার জন্য console log
  console.log('SeedsFertilizersDashboard component loaded');
  
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">
            🌱 Seeds & Fertilizers Dashboard
          </h2>
          
          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Header>
                  <h5>Available Seeds</h5>
                </Card.Header>
                <Card.Body>
                  <p>Browse and order high-quality seeds from trusted suppliers.</p>
                  <button className="btn btn-success">View Seeds</button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="mb-3">
                <Card.Header>
                  <h5>Fertilizer Options</h5>
                </Card.Header>
                <Card.Body>
                  <p>Compare organic and chemical fertilizers with pricing and usage tips.</p>
                  <button className="btn btn-primary">View Fertilizers</button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          
          {/* <div className="alert alert-info mt-3">
            <strong>Debug:</strong> If you can see this message, the component is working properly!
            Current URL: {window.location.pathname}
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default SeedsFertilizersDashboard;