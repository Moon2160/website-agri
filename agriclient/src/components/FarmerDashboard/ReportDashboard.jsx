import React, { useState, useEffect } from "react";
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Table, 
    Button, 
    Form, 
    Badge,
    Dropdown,
    ProgressBar,
    Modal
} from "react-bootstrap";

export default function ReportDashboard() {
    // Sample data - replace with actual API calls
    const [salesData, setSalesData] = useState([
        {
            id: 1,
            productId: "101",
            product: "Rice",
            quantity: 50,
            pricePerUnit: 25,
            totalAmount: 1250,
            buyer: "Abdul Karim",
            date: "2025-08-10",
            seedUsed: 2.5,
            fertilizerUsed: 10
        },
        {
            id: 2,
            productId: "102",
            product: "Wheat",
            quantity: 30,
            pricePerUnit: 30,
            totalAmount: 900,
            buyer: "Rahim Uddin",
            date: "2025-08-08",
            seedUsed: 1.5,
            fertilizerUsed: 8
        },
        {
            id: 3,
            productId: "103",
            product: "Corn",
            quantity: 40,
            pricePerUnit: 20,
            totalAmount: 800,
            buyer: "Salim Mia",
            date: "2025-08-05",
            seedUsed: 2,
            fertilizerUsed: 12
        }
    ]);

    const initialNewSale = {
        productId: '',
        product: '',
        quantity: 0,
        pricePerUnit: 0,
        totalAmount: 0,
        buyer: '',
        date: '',
        seedUsed: 0,
        fertilizerUsed: 0
    };

    const [filterDate, setFilterDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editSale, setEditSale] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSale, setNewSale] = useState(initialNewSale);

    // Calculate summary statistics
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalProducts = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalSeedUsed = salesData.reduce((sum, sale) => sum + sale.seedUsed, 0);
    const totalFertilizerUsed = salesData.reduce((sum, sale) => sum + sale.fertilizerUsed, 0);

    // Get top selling product
    const productSales = salesData.reduce((acc, sale) => {
        acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
        return acc;
    }, {});
    const topProduct = Object.entries(productSales).sort(([,a], [,b]) => b - a)[0];

    // Filter data by date
    const filteredData = filterDate 
        ? salesData.filter(sale => sale.date >= filterDate)
        : salesData;

    const handleViewDetails = (sale) => {
        setSelectedSale(sale);
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (['quantity', 'pricePerUnit', 'seedUsed', 'fertilizerUsed'].includes(name)) {
            val = parseFloat(value) || 0;
        }
        const updated = { ...editSale, [name]: val };
        if (name === 'quantity' || name === 'pricePerUnit') {
            updated.totalAmount = updated.quantity * updated.pricePerUnit;
        }
        setEditSale(updated);
    };

    const handleEditSubmit = () => {
        const updatedSales = salesData.map(s => s.id === editSale.id ? editSale : s);
        setSalesData(updatedSales);
        setSelectedSale(editSale);
        setIsEditing(false);
    };

    const handleNewSaleChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (['quantity', 'pricePerUnit', 'seedUsed', 'fertilizerUsed'].includes(name)) {
            val = parseFloat(value) || 0;
        }
        const updated = { ...newSale, [name]: val };
        if (name === 'quantity' || name === 'pricePerUnit') {
            updated.totalAmount = updated.quantity * updated.pricePerUnit;
        }
        setNewSale(updated);
    };

    const handleAddSubmit = () => {
        const id = salesData.length ? Math.max(...salesData.map(s => s.id)) + 1 : 1;
        const toAdd = { ...newSale, id };
        setSalesData([...salesData, toAdd]);
        setNewSale(initialNewSale);
        setShowAddModal(false);
    };

    const exportToPDF = () => {
        // PDF export logic would go here
        alert("PDF Export functionality - Connect with jsPDF library");
    };

  

   const sendDataToBackend = async () => {
    try {
        for (const sale of salesData) {
            const response = await fetch("http://127.0.0.1:8000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: sale.productId,
                    product_name: sale.product,
                    quantity: sale.quantity,
                    price_per_kg: sale.pricePerUnit,
                    total_value: sale.totalAmount,
                    seeds_used: sale.seedUsed,
                    fertilizer_used: sale.fertilizerUsed,
                    buyer_name: sale.buyer,
                    sales_date: sale.date,
                }),
            });

           if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to send: ${sale.product} - ${errorData.error || errorData.details.product_name || response.statusText}`);
}
        }

        alert("✅ All sales data sent to backend!");
    } catch (error) {
        console.error("❌ Error sending data:", error);
        alert(`Something went wrong while syncing: ${error.message}`);
    }
};
    return (
        <Container fluid className="py-4" style={{backgroundColor: "#f8f9fa", minHeight: "100vh"}}>
            {/* Header */}
            <Row className="mb-4">
                <Col>
                    <Card className="border-0 shadow-lg" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
                        <Card.Body className="text-white text-center py-5">
                            <h1 className="mb-2 fw-bold">
                                📊 Sales & Revenue Report
                            </h1>
                            <p className="mb-0 lead">Track your crop sales, revenue trends, and buyer analytics</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Summary Cards */}
            <Row className="mb-5">
                <Col xl={3} lg={6} md={6} sm={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100" style={{borderLeft: "4px solid #28a745"}}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h6 className="text-muted mb-2 text-uppercase fw-bold">Total Revenue</h6>
                                    <h2 className="text-success mb-0 fw-bold">৳{totalRevenue.toLocaleString()}</h2>
                                </div>
                                <div className="text-success" style={{fontSize: "3rem", opacity: "0.3"}}>
                                    💰
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100" style={{borderLeft: "4px solid #17a2b8"}}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h6 className="text-muted mb-2 text-uppercase fw-bold">Total Products Sold</h6>
                                    <h2 className="text-info mb-0 fw-bold">{totalProducts} kg</h2>
                                </div>
                                <div className="text-info" style={{fontSize: "3rem", opacity: "0.3"}}>
                                    📦
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100" style={{borderLeft: "4px solid #ffc107"}}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h6 className="text-muted mb-2 text-uppercase fw-bold">Top Selling Product</h6>
                                    <h2 className="text-warning mb-1 fw-bold">{topProduct ? topProduct[0] : "N/A"}</h2>
                                    <small className="text-muted">{topProduct ? topProduct[1] : 0} kg sold</small>
                                </div>
                                <div className="text-warning" style={{fontSize: "3rem", opacity: "0.3"}}>
                                    🌾
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100" style={{borderLeft: "4px solid #6f42c1"}}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h6 className="text-muted mb-2 text-uppercase fw-bold">Average Price</h6>
                                    <h2 className="text-purple mb-1 fw-bold" style={{color: "#6f42c1"}}>৳{Math.round(totalRevenue/totalProducts) || 0}</h2>
                                    <small className="text-muted">per kg</small>
                                </div>
                                <div style={{fontSize: "3rem", opacity: "0.3", color: "#6f42c1"}}>
                                    📈
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Resource Usage Summary */}
            <Row className="mb-5">
                <Col lg={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Header className="bg-primary text-white py-3">
                            <h5 className="mb-0 fw-bold">🌱 Seed Usage Summary</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="fw-bold">Total Seeds Used</span>
                                <Badge bg="primary" className="fs-6 px-3 py-2">{totalSeedUsed} kg</Badge>
                            </div>
                            <div className="mb-3">
                                <ProgressBar 
                                    variant="primary" 
                                    now={(totalSeedUsed/20)*100} 
                                    style={{height: "12px"}}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">Used: {totalSeedUsed} kg</small>
                                <small className="text-muted">Capacity: 20 kg</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="mb-4">
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Header className="bg-success text-white py-3">
                            <h5 className="mb-0 fw-bold">🧪 Fertilizer Usage Summary</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="fw-bold">Total Fertilizer Used</span>
                                <Badge bg="success" className="fs-6 px-3 py-2">{totalFertilizerUsed} kg</Badge>
                            </div>
                            <div className="mb-3">
                                <ProgressBar 
                                    variant="success" 
                                    now={(totalFertilizerUsed/50)*100} 
                                    style={{height: "12px"}}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">Used: {totalFertilizerUsed} kg</small>
                                <small className="text-muted">Capacity: 50 kg</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Filters and Actions */}
            <Row className="mb-4">
                <Col lg={4} md={6} className="mb-3">
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-3">
                            <Form.Group>
                                <Form.Label className="fw-bold">📅 Filter by Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="form-control-lg"
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8} md={6} className="d-flex align-items-end justify-content-end mb-3">
                    <Dropdown className="me-3">
                        <Dropdown.Toggle variant="outline-primary" size="lg" className="px-4">
                            📊 Export Report
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={exportToPDF}>
                                📄 Download as PDF
                            </Dropdown.Item>
                            <Dropdown.Item>
                                📊 Download as Excel
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary" size="lg" className="me-3 px-4" onClick={sendDataToBackend}>
                        🔄 Sync to Backend
                    </Button>
                    <Button variant="success" size="lg" className="px-4" onClick={() => setShowAddModal(true)}>
                        ➕ Add New Sale
                    </Button>
                </Col>
            </Row>

            {/* Sales Table */}
            <Row>
                <Col>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-light py-3">
                            <h4 className="mb-0 fw-bold">📋 Recent Sales Records</h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive">
                                <Table hover className="mb-0">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="py-3 px-4">Product Name</th>
                                            <th className="py-3 px-4">Quantity (kg)</th>
                                            <th className="py-3 px-4">Price (৳/kg)</th>
                                            <th className="py-3 px-4">Total Amount</th>
                                            <th className="py-3 px-4">Buyer Name</th>
                                            <th className="py-3 px-4">Date</th>
                                            <th className="py-3 px-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((sale, index) => (
                                            <tr key={sale.id} className={index % 2 === 0 ? "bg-light" : ""}>
                                                <td className="py-3 px-4">
                                                    <div className="d-flex align-items-center">
                                                        <Badge bg="secondary" className="me-2">🌾</Badge>
                                                        <strong>{sale.product}</strong>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 fw-bold">{sale.quantity}</td>
                                                <td className="py-3 px-4">৳{sale.pricePerUnit}</td>
                                                <td className="py-3 px-4">
                                                    <span className="fw-bold text-success fs-5">
                                                        ৳{sale.totalAmount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">{sale.buyer}</td>
                                                <td className="py-3 px-4">{new Date(sale.date).toLocaleDateString()}</td>
                                                <td className="py-3 px-4">
                                                    <Button 
                                                        variant="outline-info" 
                                                        size="sm"
                                                        onClick={() => handleViewDetails(sale)}
                                                        className="px-3"
                                                    >
                                                        👁️ Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                        <Card.Footer className="bg-light py-3">
                            <Row>
                                <Col md={6}>
                                    <p className="mb-0 text-muted">
                                        <strong>Showing {filteredData.length} records</strong>
                                    </p>
                                </Col>
                                <Col md={6} className="text-end">
                                    <p className="mb-0">
                                        <strong className="text-success fs-5">
                                            Filtered Total: ৳{filteredData.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}
                                        </strong>
                                    </p>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            {/* Add New Sale Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title className="fw-bold">➕ Add New Sale</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product ID</Form.Label>
                                    <Form.Control type="text" name="productId" value={newSale.productId} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="product" value={newSale.product} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity (kg)</Form.Label>
                                    <Form.Control type="number" name="quantity" value={newSale.quantity} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price per kg (৳)</Form.Label>
                                    <Form.Control type="number" name="pricePerUnit" value={newSale.pricePerUnit} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total Value (৳)</Form.Label>
                                    <Form.Control readOnly value={newSale.totalAmount} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seeds Used (kg)</Form.Label>
                                    <Form.Control type="number" name="seedUsed" value={newSale.seedUsed} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fertilizer Used (kg)</Form.Label>
                                    <Form.Control type="number" name="fertilizerUsed" value={newSale.fertilizerUsed} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Buyer Name</Form.Label>
                                    <Form.Control type="text" name="buyer" value={newSale.buyer} onChange={handleNewSaleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sales Date</Form.Label>
                                    <Form.Control type="date" name="date" value={newSale.date} onChange={handleNewSaleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddSubmit}>
                        Save New Sale
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Detail/Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title className="fw-bold">📊 {isEditing ? 'Edit Sale' : 'Sale Details'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedSale && (
                        <Row>
                            <Col md={6}>
                                <Card className="mb-3 border-primary">
                                    <Card.Header className="bg-light">
                                        <h6 className="mb-0 fw-bold">🌾 Product Information</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        {isEditing ? (
                                            <>
                                                <Form.Group className="mb-2">
                                                    <strong>Product ID:</strong>
                                                    <Form.Control name="productId" value={editSale.productId} onChange={handleEditChange} />
                                                </Form.Group>
                                                <Form.Group className="mb-2">
                                                    <strong>Name:</strong>
                                                    <Form.Control name="product" value={editSale.product} onChange={handleEditChange} />
                                                </Form.Group>
                                                <Form.Group className="mb-2">
                                                    <strong>Quantity:</strong>
                                                    <Form.Control type="number" name="quantity" value={editSale.quantity} onChange={handleEditChange} />
                                                </Form.Group>
                                                <Form.Group className="mb-2">
                                                    <strong>Price:</strong>
                                                    <Form.Control type="number" name="pricePerUnit" value={editSale.pricePerUnit} onChange={handleEditChange} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <strong>Total Value:</strong>
                                                    <Form.Control readOnly value={editSale.totalAmount} />
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <div className="mb-2"><strong>Product ID:</strong> {selectedSale.productId}</div>
                                                <div className="mb-2"><strong>Name:</strong> {selectedSale.product}</div>
                                                <div className="mb-2"><strong>Quantity:</strong> {selectedSale.quantity} kg</div>
                                                <div className="mb-2"><strong>Price:</strong> ৳{selectedSale.pricePerUnit} per kg</div>
                                                <div><strong>Total Value:</strong> <span className="text-success fw-bold fs-5">৳{selectedSale.totalAmount}</span></div>
                                            </>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="mb-3 border-success">
                                    <Card.Header className="bg-light">
                                        <h6 className="mb-0 fw-bold">👤 Buyer Information</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        {isEditing ? (
                                            <>
                                                <Form.Group className="mb-2">
                                                    <strong>Name:</strong>
                                                    <Form.Control name="buyer" value={editSale.buyer} onChange={handleEditChange} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <strong>Sale Date:</strong>
                                                    <Form.Control type="date" name="date" value={editSale.date} onChange={handleEditChange} />
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <div className="mb-2"><strong>Name:</strong> {selectedSale.buyer}</div>
                                                <div><strong>Sale Date:</strong> {new Date(selectedSale.date).toLocaleDateString()}</div>
                                            </>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card className="border-warning">
                                    <Card.Header className="bg-light">
                                        <h6 className="mb-0 fw-bold">🌱 Resource Usage</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                {isEditing ? (
                                                    <Form.Group className="mb-2">
                                                        <strong>Seeds Used:</strong>
                                                        <Form.Control type="number" name="seedUsed" value={editSale.seedUsed} onChange={handleEditChange} />
                                                    </Form.Group>
                                                ) : (
                                                    <div className="mb-2"><strong>Seeds Used:</strong> {selectedSale.seedUsed} kg</div>
                                                )}
                                                <ProgressBar variant="primary" now={((isEditing ? editSale.seedUsed : selectedSale.seedUsed)/5)*100} label={`${(isEditing ? editSale.seedUsed : selectedSale.seedUsed)} kg`} style={{height: "25px"}} />
                                            </Col>
                                            <Col md={6}>
                                                {isEditing ? (
                                                    <Form.Group className="mb-2">
                                                        <strong>Fertilizer Used:</strong>
                                                        <Form.Control type="number" name="fertilizerUsed" value={editSale.fertilizerUsed} onChange={handleEditChange} />
                                                    </Form.Group>
                                                ) : (
                                                    <div className="mb-2"><strong>Fertilizer Used:</strong> {selectedSale.fertilizerUsed} kg</div>
                                                )}
                                                <ProgressBar variant="success" now={((isEditing ? editSale.fertilizerUsed : selectedSale.fertilizerUsed)/15)*100} label={`${(isEditing ? editSale.fertilizerUsed : selectedSale.fertilizerUsed)} kg`} style={{height: "25px"}} />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleEditSubmit}>
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { setEditSale({ ...selectedSale }); setIsEditing(true); }}>
                                📝 Edit Sale
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    );
}