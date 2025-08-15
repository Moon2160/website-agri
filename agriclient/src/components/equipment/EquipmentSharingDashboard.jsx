import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Badge, Form, Modal, ListGroup, InputGroup } from 'react-bootstrap';
import { FaTools, FaTractor, FaShare, FaClock, FaMapMarkerAlt, FaPlus, FaSearch, FaCalendarAlt, FaStar, FaPhone, FaUser } from 'react-icons/fa';
import { GiPlantSeed, GiSpray, GiWheat } from 'react-icons/gi';

const equipmentData = [
  { 
    id: 1, 
    name: 'Mahindra Tractor 575 DI', 
    type: 'Heavy Machinery', 
    location: 'Hathazari, 2km away', 
    price: 800, 
    available: true,
    owner: 'Karim Mia',
    rating: 4.8,
    condition: 'Excellent',
    description: 'Well-maintained tractor perfect for plowing and cultivation',
    phone: '01712345678',
    image: '🚜'
  },
  { 
    id: 2, 
    name: 'Rotary Plow', 
    type: 'Attachment', 
    location: 'Chittagong, 3km away', 
    price: 300, 
    available: false,
    owner: 'Rahim Uddin',
    rating: 4.5,
    condition: 'Very Good',
    description: 'Heavy-duty plow for deep soil cultivation',
    phone: '01787654321',
    image: '🔧'
  },
  { 
    id: 3, 
    name: 'Mini Rice Harvester', 
    type: 'Heavy Machinery', 
    location: 'Hathazari, 1km away', 
    price: 1200, 
    available: true,
    owner: 'Salma Begum',
    rating: 4.9,
    condition: 'Excellent',
    description: 'Efficient rice harvester suitable for small to medium fields',
    phone: '01798765432',
    image: '🌾'
  },
  { 
    id: 4, 
    name: 'Seed Drill Machine', 
    type: 'Planting Equipment', 
    location: 'Chittagong, 4km away', 
    price: 400, 
    available: true,
    owner: 'Abdul Haq',
    rating: 4.6,
    condition: 'Good',
    description: 'Precision seed planting for various crops',
    phone: '01876543210',
    image: '🌱'
  },
  { 
    id: 5, 
    name: 'Power Sprayer', 
    type: 'Spraying Equipment', 
    location: 'Hathazari, 3km away', 
    price: 250, 
    available: true,
    owner: 'Nazrul Islam',
    rating: 4.7,
    condition: 'Very Good',
    description: 'High-pressure sprayer for pesticide and fertilizer application',
    phone: '01765432109',
    image: '💦'
  },
  { 
    id: 6, 
    name: 'Wheat Thresher', 
    type: 'Processing Equipment', 
    location: 'Chittagong, 5km away', 
    price: 600, 
    available: true,
    owner: 'Fatema Khatun',
    rating: 4.4,
    condition: 'Good',
    description: 'Efficient wheat and grain threshing machine',
    phone: '01654321098',
    image: '🌾'
  },
  { 
    id: 7, 
    name: 'Cultivator', 
    type: 'Soil Preparation', 
    location: 'Hathazari, 2km away', 
    price: 350, 
    available: false,
    owner: 'Md. Hasan',
    rating: 4.3,
    condition: 'Fair',
    description: 'Spring-loaded cultivator for field preparation',
    phone: '01543210987',
    image: '🔨'
  },
  { 
    id: 8, 
    name: 'Water Pump', 
    type: 'Irrigation', 
    location: 'Chittagong, 6km away', 
    price: 200, 
    available: true,
    owner: 'Rashida Begum',
    rating: 4.5,
    condition: 'Very Good',
    description: 'Diesel water pump for irrigation purposes',
    phone: '01432109876',
    image: '💧'
  }
];

export default function EquipmentSharingDashboard() {
  const [filters, setFilters] = useState({ search: '', type: '', location: '', available: 'all' });
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    renterName: '',
    phone: '',
    nid: '',
    address: '',
    startDate: '',
    endDate: '',
    duration: 1,
    purpose: '',
    totalCost: 0
  });
  const [shareData, setShareData] = useState({
    equipmentName: '',
    type: '',
    brand: '',
    model: '',
    condition: '',
    dailyRate: '',
    description: '',
    location: '',
    ownerName: '',
    phone: ''
  });

  useEffect(() => {
    console.log('✅ EquipmentSharingDashboard component mounted');
    console.log('Current URL:', window.location.pathname);
  }, []);

  useEffect(() => {
    if (bookingData.duration && selectedEquipment) {
      setBookingData(prev => ({
        ...prev,
        totalCost: prev.duration * selectedEquipment.price
      }));
    }
  }, [bookingData.duration, selectedEquipment]);

  const filteredEquipment = equipmentData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.owner.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === '' || item.type === filters.type;
    const matchesLocation = filters.location === '' || item.location.includes(filters.location);
    const matchesAvailable = filters.available === 'all' || 
                            (filters.available === 'available' && item.available) ||
                            (filters.available === 'unavailable' && !item.available);
    
    return matchesSearch && matchesType && matchesLocation && matchesAvailable;
  });

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'duration' && { duration: parseInt(value) || 1 })
    }));
  };

  const handleShareInputChange = (e) => {
    const { name, value } = e.target;
    setShareData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBook = (equipment) => {
    setSelectedEquipment(equipment);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData, selectedEquipment);
    alert('Equipment booked successfully! The owner will contact you soon.');
    setShowBookingModal(false);
    setBookingData({
      renterName: '',
      phone: '',
      nid: '',
      address: '',
      startDate: '',
      endDate: '',
      duration: 1,
      purpose: '',
      totalCost: 0
    });
  };

  const handleShareSubmit = (e) => {
    e.preventDefault();
    console.log('Share equipment submitted:', shareData);
    alert('Equipment listed successfully! It will appear in the marketplace after verification.');
    setShowShareModal(false);
    setShareData({
      equipmentName: '',
      type: '',
      brand: '',
      model: '',
      condition: '',
      dailyRate: '',
      description: '',
      location: '',
      ownerName: '',
      phone: ''
    });
  };

  const getConditionBadge = (condition) => {
    const variants = {
      'Excellent': 'success',
      'Very Good': 'primary',
      'Good': 'info',
      'Fair': 'warning'
    };
    return variants[condition] || 'secondary';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < Math.floor(rating) ? 'text-warning' : 'text-muted'}
        size={14}
      />
    ));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#8ebee3ff', paddingTop: '20px', paddingBottom: '20px' }}>
      <Container>
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <FaTools size={40} className="text-primary me-3" />
                <div>
                  <h1 className="h2 mb-1 text-primary">🛠️ Equipment Sharing Dashboard</h1>
                  <p className="text-muted mb-0">Find, share, or rent agricultural equipment with nearby farmers</p>
                </div>
              </div>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => setShowShareModal(true)}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-2" />
                Share Equipment
              </Button>
            </div>
            <Alert variant="info" className="mb-4">
              <Alert.Heading>Welcome to Equipment Sharing! 🤝</Alert.Heading>
              <p>Connect with nearby farmers to find, share, or rent agricultural equipment efficiently. Save money and increase productivity together!</p>
            </Alert>
          </Col>
        </Row>

        {/* Stats Cards */}
      {/* Stats Cards */}
       <Row className="mb-4">
  <Col md={3} sm={6} className="mb-3">
    <Card className="h-100 border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #ff6f61 0%, #d96c6c 100%)'}}>
      <Card.Body className="text-center text-white d-flex flex-column justify-content-center" style={{minHeight: '140px'}}>
        <FaTractor size={30} className="mb-2" />
        <Card.Title className="h6 mb-1">Available Equipment</Card.Title>
        <h3 className="fw-bold mb-2">{equipmentData.filter(eq => eq.available).length}</h3>
        <Badge bg="success" text="white" style={{fontSize: '0.75rem', backgroundColor: '#28a745'}}>Ready to Rent</Badge>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3} sm={6} className="mb-3">
    <Card className="h-100 border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #6b48ff 0%, #a15bff 100%)'}}>
      <Card.Body className="text-center text-white d-flex flex-column justify-content-center" style={{minHeight: '140px'}}>
        <FaShare size={30} className="mb-2" />
        <Card.Title className="h6 mb-1">Your Shared</Card.Title>
        <h3 className="fw-bold mb-2">3</h3>
        <Badge bg="warning" text="white" style={{fontSize: '0.75rem', backgroundColor: '#ffc107'}}>Listed</Badge>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3} sm={6} className="mb-3">
    <Card className="h-100 border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)'}}>
      <Card.Body className="text-center text-white d-flex flex-column justify-content-center" style={{minHeight: '140px'}}>
        <FaClock size={30} className="mb-2" />
        <Card.Title className="h6 mb-1">Active Bookings</Card.Title>
        <h3 className="fw-bold mb-2">2</h3>
        <Badge bg="info" text="white" style={{fontSize: '0.75rem', backgroundColor: '#17a2b8'}}>In Progress</Badge>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3} sm={6} className="mb-3">
    <Card className="h-100 border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #ffcc00 0%, #ff9f43 100%)'}}>
      <Card.Body className="text-center text-white d-flex flex-column justify-content-center" style={{minHeight: '140px'}}>
        <FaMapMarkerAlt size={30} className="mb-2" />
        <Card.Title className="h6 mb-1">Nearby Options</Card.Title>
        <h3 className="fw-bold mb-2">15</h3>
        <Badge bg="primary" text="white" style={{fontSize: '0.75rem', backgroundColor: '#007bff'}}>Within 10km</Badge>
      </Card.Body>
    </Card>
  </Col>
</Row>
        {/* Filter Bar */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0 d-flex align-items-center">
              <FaSearch className="me-2" />
              Filter Equipment
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search equipment or owner..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </InputGroup>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Equipment Type</Form.Label>
                <Form.Select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="Heavy Machinery">Heavy Machinery</option>
                  <option value="Attachment">Attachment</option>
                  <option value="Planting Equipment">Planting Equipment</option>
                  <option value="Spraying Equipment">Spraying Equipment</option>
                  <option value="Processing Equipment">Processing Equipment</option>
                  <option value="Soil Preparation">Soil Preparation</option>
                  <option value="Irrigation">Irrigation</option>
                </Form.Select>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  <option value="">All Locations</option>
                  <option value="Hathazari">Hathazari</option>
                  <option value="Chittagong">Chittagong</option>
                </Form.Select>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  value={filters.available}
                  onChange={(e) => setFilters({ ...filters, available: e.target.value })}
                >
                  <option value="all">All Equipment</option>
                  <option value="available">Available Only</option>
                  <option value="unavailable">Unavailable</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Equipment Grid */}
        <Row>
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((equipment) => (
              <Col md={4} sm={6} key={equipment.id} className="mb-4">
                <Card className="h-100 shadow-sm border-0 position-relative">
                  {!equipment.available && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                         style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1, borderRadius: '0.375rem'}}>
                      <Badge bg="danger" className="fs-6">Currently Unavailable</Badge>
                    </div>
                  )}
                  <Card.Header className="bg-light border-0 text-center">
                    <div style={{fontSize: '3rem'}}>{equipment.image}</div>
                    <Badge bg={getConditionBadge(equipment.condition)} className="position-absolute top-0 end-0 m-2">
                      {equipment.condition}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="h5 text-primary">{equipment.name}</Card.Title>
                    <div className="d-flex align-items-center mb-2">
                      {renderStars(equipment.rating)}
                      <small className="text-muted ms-2">({equipment.rating}/5.0)</small>
                    </div>
                    <p className="text-muted small mb-2">
                      <strong>Type:</strong> {equipment.type}
                    </p>
                    <p className="text-muted small mb-2">
                      <FaMapMarkerAlt className="text-danger me-1" />
                      {equipment.location}
                    </p>
                    <p className="text-muted small mb-2">
                      <FaUser className="text-info me-1" />
                      Owner: {equipment.owner}
                    </p>
                    <p className="small mb-3">{equipment.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-success mb-0">৳{equipment.price}/day</h5>
                      <Button
                        variant={equipment.available ? "success" : "secondary"}
                        size="sm"
                        disabled={!equipment.available}
                        onClick={() => handleBook(equipment)}
                      >
                        {equipment.available ? "Book Now" : "Unavailable"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="warning" className="text-center">
                <h5>No equipment matches your filters</h5>
                <p>Try adjusting your search criteria or check back later for new listings.</p>
              </Alert>
            </Col>
          )}
        </Row>

        {/* Booking Modal */}
        <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaCalendarAlt className="me-2 text-success" />
              Book {selectedEquipment?.name}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleBookingSubmit}>
            <Modal.Body>
              {selectedEquipment && (
                <Alert variant="info">
                  <Row>
                    <Col md={8}>
                      <h6>{selectedEquipment.name}</h6>
                      <p className="mb-1"><FaUser className="me-1" />Owner: {selectedEquipment.owner}</p>
                      <p className="mb-1"><FaPhone className="me-1" />Contact: {selectedEquipment.phone}</p>
                      <p className="mb-0">Daily Rate: <strong>৳{selectedEquipment.price}</strong></p>
                    </Col>
                    <Col md={4} className="text-end">
                      <div style={{fontSize: '3rem'}}>{selectedEquipment.image}</div>
                    </Col>
                  </Row>
                </Alert>
              )}
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="renterName"
                      value={bookingData.renterName}
                      onChange={handleBookingInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleBookingInputChange}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NID Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nid"
                      value={bookingData.nid}
                      onChange={handleBookingInputChange}
                      placeholder="Enter NID number"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rental Duration (Days) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleBookingInputChange}
                      min="1"
                      max="30"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={bookingData.startDate}
                      onChange={handleBookingInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={bookingData.endDate}
                      onChange={handleBookingInputChange}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={bookingData.address}
                  onChange={handleBookingInputChange}
                  placeholder="Enter your complete address"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Purpose of Use</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="purpose"
                  value={bookingData.purpose}
                  onChange={handleBookingInputChange}
                  placeholder="Describe how you will use this equipment..."
                />
              </Form.Group>
              
              {bookingData.duration > 0 && selectedEquipment && (
                <Alert variant="success">
                  <Row>
                    <Col>
                      <strong>Total Cost: ৳{bookingData.duration * selectedEquipment.price}</strong>
                      <br />
                      <small>({bookingData.duration} days × ৳{selectedEquipment.price}/day)</small>
                    </Col>
                  </Row>
                </Alert>
              )}
              
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  id="booking-terms"
                  label="I agree to the rental terms and conditions. I understand I'm responsible for the equipment during the rental period."
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Share Equipment Modal */}
        <Modal show={showShareModal} onHide={() => setShowShareModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaPlus className="me-2 text-success" />
              Share Your Equipment
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleShareSubmit}>
            <Modal.Body>
              <Alert variant="info">
                <strong>List your equipment for rent and earn extra income!</strong><br />
                Fill out the details below to make your equipment available to nearby farmers.
              </Alert>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Equipment Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="equipmentName"
                      value={shareData.equipmentName}
                      onChange={handleShareInputChange}
                      placeholder="e.g., Mahindra Tractor 575 DI"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Equipment Type *</Form.Label>
                    <Form.Select
                      name="type"
                      value={shareData.type}
                      onChange={handleShareInputChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Heavy Machinery">Heavy Machinery</option>
                      <option value="Attachment">Attachment</option>
                      <option value="Planting Equipment">Planting Equipment</option>
                      <option value="Spraying Equipment">Spraying Equipment</option>
                      <option value="Processing Equipment">Processing Equipment</option>
                      <option value="Soil Preparation">Soil Preparation</option>
                      <option value="Irrigation">Irrigation</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={shareData.brand}
                      onChange={handleShareInputChange}
                      placeholder="e.g., Mahindra, TAFE, Kubota"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                      type="text"
                      name="model"
                      value={shareData.model}
                      onChange={handleShareInputChange}
                      placeholder="Enter model number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Condition *</Form.Label>
                    <Form.Select
                      name="condition"
                      value={shareData.condition}
                      onChange={handleShareInputChange}
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Daily Rental Rate (৳) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="dailyRate"
                      value={shareData.dailyRate}
                      onChange={handleShareInputChange}
                      placeholder="Enter daily rate"
                      min="50"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={shareData.description}
                  onChange={handleShareInputChange}
                  placeholder="Describe your equipment, its features, and any special instructions..."
                  required
                />
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={shareData.location}
                      onChange={handleShareInputChange}
                      placeholder="e.g., Hathazari, Chittagong"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={shareData.phone}
                      onChange={handleShareInputChange}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Owner Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="ownerName"
                  value={shareData.ownerName}
                  onChange={handleShareInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  id="share-terms"
                  label="I confirm that I own this equipment and agree to the platform's terms for equipment sharing."
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowShareModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                List Equipment
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Recent Activity Section */}
        <Row className="mt-4">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">📈 Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Tractor booked by Nazrul Islam</h6>
                      <small className="text-muted">2 hours ago • 3 days rental</small>
                    </div>
                    <Badge bg="success">Confirmed</Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">New harvester listed by Fatema Khatun</h6>
                      <small className="text-muted">1 day ago • ৳1200/day</small>
                    </div>
                    <Badge bg="info">New Listing</Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Payment received for seed drill rental</h6>
                      <small className="text-muted">2 days ago • ৳1200 total</small>
                    </div>
                    <Badge bg="success">Paid</Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Sprayer returned by Abdul Rahman</h6>
                      <small className="text-muted">3 days ago • Good condition</small>
                    </div>
                    <Badge bg="primary">Completed</Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">📊 Your Stats</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <small className="text-muted d-block">Equipment Shared</small>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">3 items</span>
                    <span className="text-success">+1 this month</span>
                  </div>
                  <div className="progress mt-1">
                    <div className="progress-bar bg-success" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Booking Success Rate</small>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">95%</span>
                    <span className="text-primary">Excellent</span>
                  </div>
                  <div className="progress mt-1">
                    <div className="progress-bar bg-primary" style={{width: '95%'}}></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Average Rating</small>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {renderStars(4.7)}
                      <span className="ms-2 fw-bold">4.7</span>
                    </div>
                    <span className="text-warning">28 reviews</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Monthly Earnings</small>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold text-success">৳8,500</span>
                    <span className="text-success">+15%</span>
                  </div>
                  <div className="progress mt-1">
                    <div className="progress-bar bg-warning" style={{width: '75%'}}></div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Quick Tips Card */}
            <Card className="shadow-sm mt-3">
              <Card.Header className="bg-warning text-white">
                <h5 className="mb-0">💡 Quick Tips</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0 small">
                  <li className="mb-2">✅ Keep equipment well-maintained for better ratings</li>
                  <li className="mb-2">✅ Respond quickly to booking requests</li>
                  <li className="mb-2">✅ Set competitive but fair pricing</li>
                  <li className="mb-2">✅ Provide clear usage instructions</li>
                  <li className="mb-0">✅ Build trust with detailed descriptions</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Debug Info */}
        {/* <Row className="mt-4">
          <Col>
            <Card className="border-primary">
              <Card.Header className="bg-primary text-white">
                <h6 className="mb-0">🐛 Debug Information</h6>
              </Card.Header>
              <Card.Body>
                <p><strong>Component:</strong> EquipmentSharingDashboard</p>
                <p><strong>Route:</strong> /equipment-sharing</p>
                <p><strong>Current URL:</strong> {window.location.pathname}</p>
                <p><strong>Available Equipment:</strong> {equipmentData.filter(eq => eq.available).length}/{equipmentData.length}</p>
                <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                <Badge bg="success">Component Successfully Loaded ✅</Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}