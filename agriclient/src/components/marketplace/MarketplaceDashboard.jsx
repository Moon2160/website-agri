import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Modal, Button, Card, Badge } from "react-bootstrap";
import axios from "axios";
import FarmerCard from "./FarmerCard";
import BuyerCard from "./BuyerCard";

export default function MarketplaceDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Contact Modal States
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactType, setContactType] = useState(''); // 'farmer' or 'buyer'

  // Helper function to extract array from response
  const extractDataArray = (response, dataType) => {
    console.log(`${dataType} API Response:`, response);
    
    if (!response || !response.data) {
      console.warn(`No data in ${dataType} response`);
      return [];
    }

    const data = response.data;
    
    // Case 1: Direct array
    if (Array.isArray(data)) {
      console.log(`${dataType} data is direct array:`, data);
      return data;
    }
    
    // Case 2: Object with array property
    if (typeof data === 'object') {
      // Try common property names
      const possibleArrays = [
        data.farmers,
        data.buyers, 
        data.data,
        data.results,
        data.items,
        data.list
      ];
      
      for (let arr of possibleArrays) {
        if (Array.isArray(arr)) {
          console.log(`${dataType} found array in property:`, arr);
          return arr;
        }
      }
      
      // If it's an object but has message property, might be success response
      if (data.message) {
        console.log(`${dataType} has message:`, data.message);
        
        // Check if there are any array properties
        const keys = Object.keys(data);
        for (let key of keys) {
          if (Array.isArray(data[key])) {
            console.log(`${dataType} found array in key ${key}:`, data[key]);
            return data[key];
          }
        }
      }
    }
    
    console.warn(`Could not extract array from ${dataType} response:`, data);
    return [];
  };

  // Contact handling functions
  const handleContactClick = (person, type) => {
    setSelectedContact(person);
    setContactType(type);
    setShowContactModal(true);
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied: ${text}`);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(`Copied: ${text}`);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        console.log('Starting API calls...');
        
        const apiCalls = [
          axios.get("http://localhost:8000/api/farmers", {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 15000
          }).catch(err => {
            console.error('Farmers API Error:', err);
            return null;
          }),
          
          axios.get("http://localhost:8000/api/buyers", {
            headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json'
            },
            timeout: 15000
          }).catch(err => {
            console.error('Buyers API Error:', err);
            return null;
          })
        ];

        const [farmerRes, buyerRes] = await Promise.all(apiCalls);
        
        // Extract data arrays
        const farmersData = farmerRes ? extractDataArray(farmerRes, 'Farmers') : [];
        const buyersData = buyerRes ? extractDataArray(buyerRes, 'Buyers') : [];
        
        console.log('Final farmers data:', farmersData);
        console.log('Final buyers data:', buyersData);
        
        setFarmers(farmersData);
        setBuyers(buyersData);
        
        // Show warning if both APIs failed
        if (!farmerRes && !buyerRes) {
          setError("Both APIs failed to respond. Please check your backend server.");
        } else if (farmersData.length === 0 && buyersData.length === 0) {
          console.log("No data found in either response");
        }
        
      } catch (err) {
        console.error('General fetch error:', err);
        setError(`Network error: ${err.message}. Please check if your backend server is running.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    console.log('Retrying data fetch...');
    setError("");
    setFarmers([]);
    setBuyers([]);
    setLoading(true);
    
    // Force re-fetch
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" className="text-success mb-3" size="lg" />
        <h5>Loading Marketplace Data...</h5>
        <p className="text-muted">Please wait while we fetch farmers and buyers information.</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>⚠️ Connection Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Make sure your backend server is running on port 8000
            </small>
            <button 
              className="btn btn-outline-danger" 
              onClick={handleRetry}
            >
              🔄 Try Again
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success mb-0">🌾 Farmer-to-Buyer Marketplace</h3>
        <button 
          className="btn btn-outline-success btn-sm"
          onClick={handleRetry}
          title="Refresh Data"
        >
          🔄 Refresh
        </button>
      </div>
      
      <Row>
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">👨‍🌾 Farmers</h5>
            <Badge bg="success">{farmers.length}</Badge>
          </div>
          
          {farmers.length > 0 ? (
            <div className="farmers-list">
              {farmers.map((farmer, idx) => {
                // Add fallback for missing data
                const farmerData = {
                  id: idx + 1,
                  name: 'Unknown Farmer',
                  ...farmer
                };
                return (
                  <Card key={farmer.id || idx} className="mb-3 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title className="text-success">
                            🌱 {farmerData.name}
                          </Card.Title>
                          <Card.Text className="text-muted mb-2">
                            📧 {farmerData.email || 'No email provided'}
                          </Card.Text>
                          {farmerData.phone && (
                            <Card.Text className="text-muted mb-2">
                              📞 {farmerData.phone}
                            </Card.Text>
                          )}
                          {farmerData.location && (
                            <Card.Text className="text-muted mb-2">
                              📍 {farmerData.location}
                            </Card.Text>
                          )}
                          <small className="text-muted">
                            Member since: {new Date(farmerData.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleContactClick(farmerData, 'farmer')}
                        >
                          💬 Contact
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Alert variant="light" className="text-center">
              <h6>📭 No Farmers Found</h6>
              <p className="mb-0 text-muted">No farmers are currently registered in the marketplace.</p>
            </Alert>
          )}
        </Col>
        
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">🛒 Buyers</h5>
            <Badge bg="primary">{buyers.length}</Badge>
          </div>
          
          {buyers.length > 0 ? (
            <div className="buyers-list">
              {buyers.map((buyer, idx) => {
                // Add fallback for missing data  
                const buyerData = {
                  id: idx + 1,
                  name: 'Unknown Buyer',
                  ...buyer
                };
                return (
                  <Card key={buyer.id || idx} className="mb-3 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title className="text-primary">
                            🏪 {buyerData.name}
                          </Card.Title>
                          <Card.Text className="text-muted mb-2">
                            📧 {buyerData.email || 'No email provided'}
                          </Card.Text>
                          {buyerData.phone && (
                            <Card.Text className="text-muted mb-2">
                              📞 {buyerData.phone}
                            </Card.Text>
                          )}
                          {buyerData.company && (
                            <Card.Text className="text-muted mb-2">
                              🏢 {buyerData.company}
                            </Card.Text>
                          )}
                          {buyerData.location && (
                            <Card.Text className="text-muted mb-2">
                              📍 {buyerData.location}
                            </Card.Text>
                          )}
                          <small className="text-muted">
                            Member since: {new Date(buyerData.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleContactClick(buyerData, 'buyer')}
                        >
                          💬 Contact
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Alert variant="light" className="text-center">
              <h6>📭 No Buyers Found</h6>
              <p className="mb-0 text-muted">No buyers are currently registered in the marketplace.</p>
            </Alert>
          )}
        </Col>
      </Row>
      
      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {contactType === 'farmer' ? '🌱 Contact Farmer' : '🛒 Contact Buyer'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <div>
              <h5 className="mb-3">{selectedContact.name}</h5>
              
              {/* Email Contact */}
              <div className="contact-option mb-3 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>📧 Email:</strong>
                    <br />
                    <span className="text-muted">{selectedContact.email}</span>
                  </div>
                  <div>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEmailClick(selectedContact.email)}
                    >
                      Send Email
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => copyToClipboard(selectedContact.email)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Phone Contact (if available) */}
              {selectedContact.phone && (
                <div className="contact-option mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>📞 Phone:</strong>
                      <br />
                      <span className="text-muted">{selectedContact.phone}</span>
                    </div>
                    <div>
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handlePhoneClick(selectedContact.phone)}
                      >
                        Call Now
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => copyToClipboard(selectedContact.phone)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Location (if available) */}
              {selectedContact.location && (
                <div className="contact-option mb-3 p-3 border rounded">
                  <strong>📍 Location:</strong>
                  <br />
                  <span className="text-muted">{selectedContact.location}</span>
                </div>
              )}

              {/* Additional Info */}
              {contactType === 'buyer' && selectedContact.company && (
                <div className="contact-option mb-3 p-3 border rounded">
                  <strong>🏢 Company:</strong>
                  <br />
                  <span className="text-muted">{selectedContact.company}</span>
                </div>
              )}

              <Alert variant="info" className="mt-3">
                <small>
                  💡 <strong>Tip:</strong> Click "Send Email" to open your email client, 
                  or "Copy" to copy contact details to clipboard.
                </small>
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContactModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Empty State */}
      {farmers.length === 0 && buyers.length === 0 && (
        <Alert variant="warning" className="mt-4 text-center">
          <h5>🏪 Marketplace is Empty</h5>
          <p>The marketplace is currently empty. This could be because:</p>
          <ul className="text-start mt-3">
            <li>The database has no records</li>
            <li>The API is returning unexpected data format</li>
            <li>There's a connection issue with the backend</li>
          </ul>
          <button className="btn btn-warning mt-2" onClick={handleRetry}>
            🔄 Refresh Data
          </button>
        </Alert>
      )}
    </Container>
  );
}