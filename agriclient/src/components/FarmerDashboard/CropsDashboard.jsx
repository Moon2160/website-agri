import React, { useState, useEffect } from "react";
import { 
    Container, 
    Card, 
    Row, 
    Col, 
    Button, 
    Badge, 
    Modal, 
    Form, 
    Table,
    ProgressBar,
    Dropdown,
    Alert,
    Nav,
    Tab
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CropsDashboard() {
    const [crops, setCrops] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [farmerName, setFarmerName] = useState('');
    const [newCrop, setNewCrop] = useState({
        name: '',
        type: '',
        plantedDate: '',
        expectedHarvest: '',
        area: '',
        status: 'growing',
        notes: ''
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        // Load farmer data and crops
        const storedName = localStorage.getItem("farmer-name");
        if (storedName) {
            setFarmerName(storedName);
        }
        loadCropsData();
    }, []);

    const loadCropsData = () => {
        // Sample crop data - in real app, fetch from API
        const sampleCrops = [
            {
                id: 1,
                name: "Rice (Boro)",
                type: "Cereal",
                plantedDate: "2024-01-15",
                expectedHarvest: "2024-05-15",
                area: "2.5 acres",
                status: "growing",
                progress: 75,
                notes: "Good growth, regular watering needed",
                weather: "favorable",
                lastUpdate: "2024-03-10"
            },
            {
                id: 2,
                name: "Wheat",
                type: "Cereal",
                plantedDate: "2023-12-01",
                expectedHarvest: "2024-04-01",
                area: "1.8 acres",
                status: "ready",
                progress: 100,
                notes: "Ready for harvest",
                weather: "good",
                lastUpdate: "2024-03-28"
            },
            {
                id: 3,
                name: "Potato",
                type: "Vegetable",
                plantedDate: "2024-02-10",
                expectedHarvest: "2024-06-10",
                area: "1.2 acres",
                status: "growing",
                progress: 45,
                notes: "Need fertilizer application",
                weather: "moderate",
                lastUpdate: "2024-03-20"
            },
            {
                id: 4,
                name: "Tomato",
                type: "Vegetable",
                plantedDate: "2024-01-20",
                expectedHarvest: "2024-04-20",
                area: "0.8 acres",
                status: "flowering",
                progress: 60,
                notes: "Flowering stage, pest control needed",
                weather: "favorable",
                lastUpdate: "2024-03-25"
            }
        ];
        setCrops(sampleCrops);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'growing': return 'success';
            case 'ready': return 'warning';
            case 'harvested': return 'info';
            case 'flowering': return 'primary';
            default: return 'secondary';
        }
    };

    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'favorable': return '☀️';
            case 'good': return '⛅';
            case 'moderate': return '🌤️';
            case 'poor': return '🌧️';
            default: return '🌦️';
        }
    };

    const handleAddCrop = () => {
        if (newCrop.name && newCrop.type && newCrop.plantedDate) {
            const crop = {
                id: Date.now(),
                ...newCrop,
                progress: 10,
                weather: 'favorable',
                lastUpdate: new Date().toISOString().split('T')[0]
            };
            setCrops(prev => [...prev, crop]);
            setNewCrop({
                name: '',
                type: '',
                plantedDate: '',
                expectedHarvest: '',
                area: '',
                status: 'growing',
                notes: ''
            });
            setShowAddModal(false);
        }
    };

    const filteredCrops = crops.filter(crop => {
        const matchesStatus = filterStatus === 'all' || crop.status === filterStatus;
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             crop.type.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getCropStats = () => {
        const totalCrops = crops.length;
        const growing = crops.filter(c => c.status === 'growing').length;
        const ready = crops.filter(c => c.status === 'ready').length;
        const totalArea = crops.reduce((sum, crop) => {
            const area = parseFloat(crop.area) || 0;
            return sum + area;
        }, 0);
        
        return { totalCrops, growing, ready, totalArea };
    };

    const stats = getCropStats();

    return (
        <Container className="mt-4" style={{ paddingBottom: "100px" }}>
            {/* Header */}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="text-success mb-1">
                                🌾 Crop Management Dashboard
                            </h2>
                            <p className="text-muted mb-0">
                                Welcome back, {farmerName}! Manage your crops efficiently.
                            </p>
                        </div>
                        <Button 
                            variant="success" 
                            onClick={() => navigate('/dashboard')}
                            className="me-2"
                        >
                            ← Back to Dashboard
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Stats Cards */}
            <Row className="mb-4">
                <Col md={3} className="mb-3">
                    <Card className="h-100 border-primary shadow-sm">
                        <Card.Body className="text-center">
                            <h1 className="text-primary mb-2">{stats.totalCrops}</h1>
                            <h6 className="text-muted mb-0">Total Crops</h6>
                            <small className="text-success">🌱 Active Cultivation</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="h-100 border-success shadow-sm">
                        <Card.Body className="text-center">
                            <h1 className="text-success mb-2">{stats.growing}</h1>
                            <h6 className="text-muted mb-0">Growing</h6>
                            <small className="text-primary">📈 In Progress</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="h-100 border-warning shadow-sm">
                        <Card.Body className="text-center">
                            <h1 className="text-warning mb-2">{stats.ready}</h1>
                            <h6 className="text-muted mb-0">Ready to Harvest</h6>
                            <small className="text-warning">⏰ Action Needed</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="h-100 border-info shadow-sm">
                        <Card.Body className="text-center">
                            <h1 className="text-info mb-2">{stats.totalArea.toFixed(1)}</h1>
                            <h6 className="text-muted mb-0">Total Area (Acres)</h6>
                            <small className="text-info">🏞️ Under Cultivation</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Main Content with Tabs */}
            <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                    <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                        <Nav variant="tabs" className="border-0">
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="overview" 
                                    className={activeTab === 'overview' ? 'text-white bg-transparent border-white' : 'text-light'}
                                >
                                    📊 Overview
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="crops" 
                                    className={activeTab === 'crops' ? 'text-white bg-transparent border-white' : 'text-light'}
                                >
                                    🌱 My Crops
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="calendar" 
                                    className={activeTab === 'calendar' ? 'text-white bg-transparent border-white' : 'text-light'}
                                >
                                    📅 Schedule
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Tab.Container>
                </Card.Header>
                
                <Card.Body>
                    {activeTab === 'overview' && (
                        <Row>
                            <Col md={8}>
                                <h5 className="mb-3">🎯 Quick Actions</h5>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Button 
                                            variant="outline-success" 
                                            className="w-100 py-3"
                                            onClick={() => setShowAddModal(true)}
                                        >
                                            <div>
                                                <div style={{ fontSize: '2rem' }}>➕</div>
                                                <div>Add New Crop</div>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Button 
                                            variant="outline-primary" 
                                            className="w-100 py-3"
                                            onClick={() => setActiveTab('crops')}
                                        >
                                            <div>
                                                <div style={{ fontSize: '2rem' }}>📋</div>
                                                <div>View All Crops</div>
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Alert variant="info">
                                    <Alert.Heading className="h6">🌤️ Weather Update</Alert.Heading>
                                    <p className="mb-1">Today: Partly Cloudy, 28°C</p>
                                    <small>Good conditions for farming activities</small>
                                </Alert>
                                <Alert variant="warning">
                                    <Alert.Heading className="h6">⚠️ Attention Needed</Alert.Heading>
                                    <p className="mb-1">{stats.ready} crops ready for harvest</p>
                                    <small>Check your ready crops section</small>
                                </Alert>
                            </Col>
                        </Row>
                    )}

                    {activeTab === 'crops' && (
                        <>
                            {/* Controls */}
                            <Row className="mb-3">
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        placeholder="🔍 Search crops..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Select 
                                        value={filterStatus} 
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="growing">Growing</option>
                                        <option value="ready">Ready</option>
                                        <option value="flowering">Flowering</option>
                                        <option value="harvested">Harvested</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Button 
                                        variant="success" 
                                        className="w-100"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        ➕ Add Crop
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="w-100"
                                        onClick={loadCropsData}
                                    >
                                        🔄 Refresh
                                    </Button>
                                </Col>
                            </Row>

                            {/* Crops Grid */}
                            <Row>
                                {filteredCrops.map(crop => (
                                    <Col md={6} lg={4} key={crop.id} className="mb-3">
                                        <Card className="h-100 shadow-sm crop-card" 
                                              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                              onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
                                              onClick={() => {
                                                  setSelectedCrop(crop);
                                                  setShowDetailsModal(true);
                                              }}>
                                            <Card.Header className="d-flex justify-content-between align-items-center">
                                                <strong>{crop.name}</strong>
                                                <div>
                                                    <Badge bg={getStatusColor(crop.status)} className="me-1">
                                                        {crop.status}
                                                    </Badge>
                                                    {getWeatherIcon(crop.weather)}
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <p className="text-muted mb-2">
                                                    <small>📍 {crop.type} • 🏞️ {crop.area}</small>
                                                </p>
                                                <div className="mb-2">
                                                    <small className="text-muted">Progress:</small>
                                                    <ProgressBar 
                                                        now={crop.progress} 
                                                        variant={getStatusColor(crop.status)}
                                                        className="mb-1"
                                                        style={{ height: '8px' }}
                                                    />
                                                    <small className="text-muted">{crop.progress}% Complete</small>
                                                </div>
                                                <p className="mb-1">
                                                    <small>🌱 Planted: {new Date(crop.plantedDate).toLocaleDateString()}</small>
                                                </p>
                                                <p className="mb-0">
                                                    <small>🎯 Expected: {new Date(crop.expectedHarvest).toLocaleDateString()}</small>
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {filteredCrops.length === 0 && (
                                <div className="text-center py-5">
                                    <h4 className="text-muted">🔍 No crops found</h4>
                                    <p className="text-muted">Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'calendar' && (
                        <div>
                            <h5 className="mb-3">📅 Farming Schedule & Calendar</h5>
                            <Row>
                                <Col md={8}>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Crop</th>
                                                <th>Activity</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {crops.map(crop => (
                                                <tr key={`harvest-${crop.id}`}>
                                                    <td>{new Date(crop.expectedHarvest).toLocaleDateString()}</td>
                                                    <td>{crop.name}</td>
                                                    <td>🌾 Expected Harvest</td>
                                                    <td>
                                                        <Badge bg={crop.status === 'ready' ? 'success' : 'warning'}>
                                                            {crop.status === 'ready' ? 'Ready Now' : 'Upcoming'}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={4}>
                                    <Card className="bg-light">
                                        <Card.Header>
                                            <strong>🗓️ This Week</strong>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="mb-2">
                                                <small className="text-success">✅ Monday: Water tomatoes</small>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-warning">⏰ Wednesday: Apply fertilizer to potatoes</small>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-primary">📋 Friday: Harvest wheat</small>
                                            </div>
                                            <div className="mb-0">
                                                <small className="text-info">🌱 Weekend: Plant new seeds</small>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Add Crop Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>🌱 Add New Crop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Crop Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g., Rice, Wheat, Potato"
                                        value={newCrop.name}
                                        onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Crop Type</Form.Label>
                                    <Form.Select
                                        value={newCrop.type}
                                        onChange={(e) => setNewCrop({...newCrop, type: e.target.value})}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Cereal">Cereal</option>
                                        <option value="Vegetable">Vegetable</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Pulse">Pulse</option>
                                        <option value="Cash Crop">Cash Crop</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Planted Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={newCrop.plantedDate}
                                        onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expected Harvest</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={newCrop.expectedHarvest}
                                        onChange={(e) => setNewCrop({...newCrop, expectedHarvest: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Area (acres)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 2.5"
                                        value={newCrop.area}
                                        onChange={(e) => setNewCrop({...newCrop, area: e.target.value + ' acres'})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={newCrop.status}
                                        onChange={(e) => setNewCrop({...newCrop, status: e.target.value})}
                                    >
                                        <option value="growing">Growing</option>
                                        <option value="flowering">Flowering</option>
                                        <option value="ready">Ready</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add any additional notes about this crop..."
                                value={newCrop.notes}
                                onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddCrop}>
                        🌱 Add Crop
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Crop Details Modal */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>🌱 {selectedCrop?.name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCrop && (
                        <div>
                            <Row>
                                <Col md={8}>
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td><strong>Type:</strong></td>
                                                <td>{selectedCrop.type}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Planted Date:</strong></td>
                                                <td>{new Date(selectedCrop.plantedDate).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Expected Harvest:</strong></td>
                                                <td>{new Date(selectedCrop.expectedHarvest).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Area:</strong></td>
                                                <td>{selectedCrop.area}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Status:</strong></td>
                                                <td>
                                                    <Badge bg={getStatusColor(selectedCrop.status)}>
                                                        {selectedCrop.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Weather:</strong></td>
                                                <td>{getWeatherIcon(selectedCrop.weather)} {selectedCrop.weather}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center">
                                        <div style={{ fontSize: '4rem' }}>🌾</div>
                                        <ProgressBar 
                                            now={selectedCrop.progress} 
                                            variant={getStatusColor(selectedCrop.status)}
                                            className="mb-2"
                                        />
                                        <small>{selectedCrop.progress}% Complete</small>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <h6>📝 Notes:</h6>
                            <p className="text-muted">{selectedCrop.notes || 'No notes available.'}</p>
                            
                            <Alert variant="info" className="mt-3">
                                <small>
                                    <strong>Last Updated:</strong> {new Date(selectedCrop.lastUpdate).toLocaleDateString()}
                                </small>
                            </Alert>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary">
                        ✏️ Edit Crop
                    </Button>
                    <Button variant="outline-danger">
                        🗑️ Delete Crop
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}