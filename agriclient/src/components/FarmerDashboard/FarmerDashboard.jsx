import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Nav, Navbar, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
    const [farmerName, setFarmerName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [activities, setActivities] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // ✅ useNavigate hook properly placed at component top level
    const navigate = useNavigate();

    useEffect(() => {
        // Get farmer data from localStorage
        const storedName = localStorage.getItem("farmer-name");
        const storedToken = localStorage.getItem("farmer-token");
        const storedPicture = localStorage.getItem("farmer-picture");
        
        console.log("Stored Name:", storedName);
        console.log("Stored Token:", storedToken);
        
        if (storedName && storedToken) {
            setFarmerName(storedName);
            setProfilePicture(storedPicture || "");
            
            // Load recent activities dynamically
            loadRecentActivities();
        } else {
            alert("❌ Please login first!");
            // ✅ Use navigate instead of window.location.href
            navigate("/login/farmer");
        }
    }, [navigate]);

    const loadRecentActivities = () => {
        const currentDate = new Date().toLocaleString();
        const activities = [
            {
                id: 1,
                icon: "✅",
                text: "Successfully logged in",
                time: currentDate,
                type: "login"
            },
            {
                id: 2,
                icon: "🌾",
                text: "Last crop update: Rice plantation",
                time: "2 days ago",
                type: "crop"
            },
            {
                id: 3,
                icon: "💰",
                text: "Last sale: 50kg wheat sold",
                time: "5 days ago",
                type: "sale"
            },
            {
                id: 4,
                icon: "📊",
                text: "Profile viewed by 3 buyers",
                time: "1 week ago",
                type: "profile"
            }
        ];
        setActivities(activities);
    };

    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                setProfilePicture(imageData);
                localStorage.setItem("farmer-picture", imageData);
                setShowProfileModal(false);
                
                // Add activity
                const newActivity = {
                    id: Date.now(),
                    icon: "📸",
                    text: "Profile picture updated",
                    time: new Date().toLocaleString(),
                    type: "profile"
                };
                setActivities(prev => [newActivity, ...prev]);
            };
            reader.readAsDataURL(file);
        }
    };

    const addNewActivity = (text, icon = "🔔") => {
        const newActivity = {
            id: Date.now(),
            icon,
            text,
            time: new Date().toLocaleString(),
            type: "action"
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only latest 5
    };

    const handleLogout = () => {
        // Clear localStorage and redirect to login
        localStorage.removeItem("farmer-name");
        localStorage.removeItem("farmer-token");
        localStorage.removeItem("farmer-picture");
        alert("✅ Logged out successfully!");
        // ✅ Use navigate instead of window.location.href
        navigate("/login/farmer");
    };

    // ✅ Improved navigation handlers with error handling
    const handleViewCrops = () => {
        try {
            addNewActivity("Viewed My Crops section", "🌱");
            console.log("Navigating to crops dashboard...");
            navigate("/dashboard/crops");
        } catch (error) {
            console.error("Error navigating to crops:", error);
            alert("Navigation error. Please try again.");
        }
    };

    const handleViewReport = () => {
        try {
            addNewActivity("Checked sales reports", "📊");
            console.log("Navigating to sales report...");
            navigate("/dashboard/report");
        } catch (error) {
            console.error("Error navigating to report:", error);
            alert("Navigation error. Please try again.");
        }
    };

    const handleViewMarket = () => {
        try {
            console.log("🛒 Market button clicked!");
            console.log("Current location:", window.location.pathname);
            addNewActivity("Visited Market Dashboard", "🛒");
            console.log("Navigating to Market Dashboard...");
            navigate("/dashboard/market");
            console.log("Navigate function called successfully");
        } catch (error) {
            console.error("❌ Error navigating to market:", error);
            alert("Navigation error. Please try again.");
        }
    };

    return (
        <>
            {/* Navigation Bar with Profile */}
            <Navbar bg="success" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#" className="fw-bold">
                        🌾 AgriConnect - Farmer Panel
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Item className="d-flex align-items-center me-3">
                            <span className="text-white fw-bold">
                                👨‍🌾 Welcome, {farmerName || "Farmer"}!
                            </span>
                        </Nav.Item>
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4 mb-5" style={{ paddingBottom: "100px" }}>
                {/* Profile Card */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="shadow-sm border-success">
                            <Card.Header className="bg-success text-white">
                                <h4 className="mb-0">
                                    <i className="bi bi-person-circle me-2"></i>
                                    Farmer Profile
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={2} className="text-center">
                                        <div 
                                            className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center position-relative" 
                                            style={{ width: "80px", height: "80px", fontSize: "2rem", cursor: "pointer" }}
                                            onClick={() => setShowProfileModal(true)}
                                        >
                                            {profilePicture ? (
                                                <img 
                                                    src={profilePicture} 
                                                    alt="Profile" 
                                                    className="rounded-circle"
                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                "👨‍🌾"
                                            )}
                                            <div 
                                                className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                                                style={{ width: "25px", height: "25px", fontSize: "12px" }}
                                            >
                                                📷
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={10}>
                                        <h3 className="text-success fw-bold mb-2">
                                            {farmerName || "Farmer Name"}
                                        </h3>
                                        <p className="text-muted mb-1">
                                            <strong>Status:</strong> <span className="badge bg-success">Active</span>
                                        </p>
                                        <p className="text-muted mb-1">
                                            <strong>Login Time:</strong> {new Date().toLocaleString()}
                                        </p>
                                        <p className="text-muted">
                                            <strong>Panel:</strong> Farmer Dashboard
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Dashboard Cards */}
                <Row> 
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow-sm border-primary">
                            <Card.Body className="text-center">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>🌱</div>
                                <Card.Title className="text-primary">My Crops</Card.Title>
                                <Card.Text>Manage your crop information and planting schedules</Card.Text>
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={handleViewCrops}
                                >
                                    View Crops
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col> 
                    
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow-sm border-warning">
                            <Card.Body className="text-center">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>📊</div>
                                <Card.Title className="text-warning">Sales Report</Card.Title>
                                <Card.Text>Track your sales and revenue analytics</Card.Text>
                                <Button 
                                    variant="warning" 
                                    size="sm"
                                    onClick={handleViewReport}
                                >
                                    View Reports
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow-sm border-info">
                            <Card.Body className="text-center">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>🛒</div>
                                <Card.Title className="text-info">Market Place</Card.Title>
                                <Card.Text>Sell your products directly to buyers</Card.Text>
                                <Button 
                                    variant="info" 
                                    size="sm"
                                    onClick={handleViewMarket}
                                >
                                    Go to Market
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <Card className="shadow-sm border-secondary">
                            <Card.Header className="bg-secondary text-white">
                                <h5 className="mb-0">📈 Recent Activity</h5>
                            </Card.Header>
                            <Card.Body>
                                {activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <p key={activity.id} className="mb-2 d-flex align-items-center">
                                            <span className="me-2">{activity.icon}</span>
                                            <span className="flex-grow-1">{activity.text}</span>
                                            <small className="text-muted ms-2">{activity.time}</small>
                                        </p>
                                    ))
                                ) : (
                                    <p className="mb-0 text-muted">No recent activities</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                        <Card className="shadow-sm border-dark">
                            <Card.Header className="bg-dark text-white">
                                <h5 className="mb-0">⚙️ Quick Actions</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="outline-success" 
                                        size="sm"
                                        onClick={() => addNewActivity("Started adding new crop", "🌱")}
                                    >
                                        🌱 Add New Crop
                                    </Button>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => setShowProfileModal(true)}
                                    >
                                        📝 Update Profile
                                    </Button>
                                    <Button 
                                        variant="outline-warning" 
                                        size="sm"
                                        onClick={() => addNewActivity("Contacted support team", "📞")}
                                    >
                                        📞 Contact Support
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Profile Picture Modal */}
                <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Profile Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <div className="mb-3">
                            <div 
                                className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mx-auto"
                                style={{ width: "120px", height: "120px", fontSize: "3rem" }}
                            >
                                {profilePicture ? (
                                    <img 
                                        src={profilePicture} 
                                        alt="Profile" 
                                        className="rounded-circle"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                ) : (
                                    "👨‍🌾"
                                )}
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Label>Choose Profile Picture:</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                onChange={handleProfilePictureUpload}
                            />
                            <Form.Text className="text-muted">
                                Upload a clear photo of yourself (JPG, PNG format)
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
                            Cancel
                        </Button>
                        {profilePicture && (
                            <Button 
                                variant="danger" 
                                onClick={() => {
                                    setProfilePicture("");
                                    localStorage.removeItem("farmer-picture");
                                    addNewActivity("Removed profile picture", "🗑️");
                                    setShowProfileModal(false);
                                }}
                            >
                                Remove Picture
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}