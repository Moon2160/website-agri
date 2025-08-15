import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button, Badge, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import { FaMoneyBillWave, FaHandHoldingUsd, FaChartLine, FaFileAlt, FaTractor, FaSeedling, FaBolt } from 'react-icons/fa';

export default function FinancialAssistanceDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState('');
  const [formData, setFormData] = useState({
    farmerId: '',
    farmerName: '',
    phone: '',
    nidNumber: '',
    landSize: '',
    cropType: '',
    loanAmount: '',
    loanPurpose: '',
    equipmentType: '',
    urgencyReason: '',
    monthlyIncome: '',
    bankAccount: ''
  });

  useEffect(() => {
    console.log('✅ FinancialAssistanceDashboard component mounted');
    console.log('Current URL:', window.location.pathname);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', activeForm, formData);
    alert(`${activeForm} application submitted successfully!`);
    setShowModal(false);
    setFormData({
      farmerId: '',
      farmerName: '',
      phone: '',
      nidNumber: '',
      landSize: '',
      cropType: '',
      loanAmount: '',
      loanPurpose: '',
      equipmentType: '',
      urgencyReason: '',
      monthlyIncome: '',
      bankAccount: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openForm = (formType) => {
    setActiveForm(formType);
    setShowModal(true);
  };

  const renderFormContent = () => {
    const commonFields = (
      <>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Farmer ID *</Form.Label>
              <Form.Control
                type="text"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleInputChange}
                placeholder="Enter your farmer ID"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>NID Number *</Form.Label>
              <Form.Control
                type="text"
                name="nidNumber"
                value={formData.nidNumber}
                onChange={handleInputChange}
                placeholder="Enter NID number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Land Size (acres) *</Form.Label>
              <Form.Control
                type="number"
                name="landSize"
                value={formData.landSize}
                onChange={handleInputChange}
                placeholder="Enter land size"
                min="0"
                step="0.1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Monthly Income (৳) *</Form.Label>
              <Form.Control
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                placeholder="Enter monthly income"
                min="0"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </>
    );

    switch (activeForm) {
      case 'Crop Loan':
        return (
          <>
            {commonFields}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crop Type *</Form.Label>
                  <Form.Select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="rice">Rice (ধান)</option>
                    <option value="wheat">Wheat (গম)</option>
                    <option value="potato">Potato (আলু)</option>
                    <option value="jute">Jute (পাট)</option>
                    <option value="vegetables">Vegetables (সবজি)</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Loan Amount (৳) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter loan amount"
                    min="5000"
                    max="500000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Loan Purpose *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                placeholder="Describe how you will use this loan..."
                required
              />
            </Form.Group>
          </>
        );

      case 'Seed Subsidy':
        return (
          <>
            {commonFields}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crop Type *</Form.Label>
                  <Form.Select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="rice">Rice (ধান)</option>
                    <option value="wheat">Wheat (গম)</option>
                    <option value="corn">Corn (ভুট্টা)</option>
                    <option value="vegetables">Vegetables (সবজি)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subsidy Amount (৳) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter subsidy amount"
                    min="1000"
                    max="50000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Seed Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                placeholder="Specify seed types and quantities needed..."
              />
            </Form.Group>
          </>
        );

      case 'Equipment Loan':
        return (
          <>
            {commonFields}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Equipment Type *</Form.Label>
                  <Form.Select
                    name="equipmentType"
                    value={formData.equipmentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select equipment</option>
                    <option value="tractor">Tractor</option>
                    <option value="harvester">Harvester</option>
                    <option value="cultivator">Cultivator</option>
                    <option value="sprayer">Sprayer</option>
                    <option value="thresher">Thresher</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Loan Amount (৳) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter loan amount"
                    min="10000"
                    max="1000000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Equipment Usage Plan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                placeholder="Describe how this equipment will help your farming..."
              />
            </Form.Group>
          </>
        );

      case 'Emergency Fund':
        return (
          <>
            {commonFields}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Emergency Amount (৳) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter emergency amount"
                    min="1000"
                    max="100000"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Urgency Level *</Form.Label>
                  <Form.Select
                    name="urgencyReason"
                    value={formData.urgencyReason}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select urgency</option>
                    <option value="very-urgent">Very Urgent (24 hours)</option>
                    <option value="urgent">Urgent (3 days)</option>
                    <option value="moderate">Moderate (1 week)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Reason *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="urgencyReason"
                value={formData.urgencyReason}
                onChange={handleInputChange}
                placeholder="Describe your emergency situation..."
                required
              />
            </Form.Group>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '20px', paddingBottom: '20px' }}>
      <Container>
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <FaHandHoldingUsd size={40} className="text-success me-3" />
              <div>
                <h1 className="h2 mb-1 text-success">💰 Financial Assistance Dashboard</h1>
                <p className="text-muted mb-0">Manage your loans, subsidies, and financial aid applications</p>
              </div>
            </div>
            <Alert variant="success" className="mb-4">
              <Alert.Heading>Welcome to Financial Assistance!</Alert.Heading>
              <p>You are now in the Financial Assistance section. Here you can apply for loans, view subsidies, and track your financial aid.</p>
              <hr />
              <p className="mb-0">
                <strong>Current URL:</strong> {window.location.pathname}
              </p>
            </Alert>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaMoneyBillWave size={30} className="text-success mb-2" />
                <Card.Title className="h5">Available Loans</Card.Title>
                <h3 className="text-success">12</h3>
                <Badge bg="success">Active</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaChartLine size={30} className="text-info mb-2" />
                <Card.Title className="h5">Subsidies</Card.Title>
                <h3 className="text-info">৳25,000</h3>
                <Badge bg="info">Available</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaFileAlt size={30} className="text-warning mb-2" />
                <Card.Title className="h5">Applications</Card.Title>
                <h3 className="text-warning">3</h3>
                <Badge bg="warning">Pending</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaHandHoldingUsd size={30} className="text-primary mb-2" />
                <Card.Title className="h5">Total Aid</Card.Title>
                <h3 className="text-primary">৳45,000</h3>
                <Badge bg="primary">Approved</Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row>
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">📋 Apply for Financial Assistance</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Button 
                      variant="outline-success" 
                      size="lg" 
                      className="w-100 d-flex align-items-center justify-content-center"
                      onClick={() => openForm('Crop Loan')}
                    >
                      <FaSeedling className="me-2" />
                      Apply for Crop Loan
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button 
                      variant="outline-info" 
                      size="lg" 
                      className="w-100 d-flex align-items-center justify-content-center"
                      onClick={() => openForm('Seed Subsidy')}
                    >
                      🌱 Seed Subsidy
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button 
                      variant="outline-warning" 
                      size="lg" 
                      className="w-100 d-flex align-items-center justify-content-center"
                      onClick={() => openForm('Equipment Loan')}
                    >
                      <FaTractor className="me-2" />
                      Equipment Loan
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button 
                      variant="outline-danger" 
                      size="lg" 
                      className="w-100 d-flex align-items-center justify-content-center"
                      onClick={() => openForm('Emergency Fund')}
                    >
                      <FaBolt className="me-2" />
                      Emergency Fund
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Recent Applications */}
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">📄 Recent Applications</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                  <div>
                    <h6 className="mb-1">Crop Loan Application</h6>
                    <small className="text-muted">Applied: 10 Aug 2025 • Amount: ৳50,000</small>
                  </div>
                  <Badge bg="warning">Under Review</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                  <div>
                    <h6 className="mb-1">Seed Subsidy</h6>
                    <small className="text-muted">Applied: 5 Aug 2025 • Amount: ৳15,000</small>
                  </div>
                  <Badge bg="success">Approved</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Equipment Loan</h6>
                    <small className="text-muted">Applied: 1 Aug 2025 • Amount: ৳200,000</small>
                  </div>
                  <Badge bg="danger">Rejected</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">📊 Your Financial Profile</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <small className="text-muted">Credit Score</small>
                  <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '75%'}}>
                      750/900
                    </div>
                  </div>
                  <small className="text-success">Excellent</small>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Loan Eligibility</small>
                  <div className="progress">
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '85%'}}>
                      85%
                    </div>
                  </div>
                  <small className="text-primary">High Eligibility</small>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Application Success Rate</small>
                  <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '90%'}}>
                      90%
                    </div>
                  </div>
                  <small className="text-warning">Excellent Track Record</small>
                </div>
              </Card.Body>
            </Card>

            {/* Eligibility Tips */}
            <Card className="shadow-sm mt-3">
              <Card.Header className="bg-warning text-white">
                <h5 className="mb-0">💡 Tips for Approval</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">✅ Complete all required fields</li>
                  <li className="mb-2">✅ Provide accurate information</li>
                  <li className="mb-2">✅ Submit valid documents</li>
                  <li className="mb-2">✅ Maintain good credit history</li>
                  <li className="mb-0">✅ Apply during peak seasons</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Application Form Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {activeForm === 'Crop Loan' && <FaSeedling className="me-2 text-success" />}
              {activeForm === 'Equipment Loan' && <FaTractor className="me-2 text-warning" />}
              {activeForm === 'Emergency Fund' && <FaBolt className="me-2 text-danger" />}
              {activeForm === 'Seed Subsidy' && '🌱 '}
              Apply for {activeForm}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
              {renderFormContent()}
              
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Account Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      placeholder="Enter bank account number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="terms-checkbox"
                  label="I agree to the terms and conditions and understand that providing false information may result in application rejection."
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Submit Application
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}