import React from "react";
import { Container, Card } from "react-bootstrap";

export default function ReportDashboard() {
    return (
        <Container className="mt-4">
            <Card className="shadow-sm border-warning">
                <Card.Header className="bg-warning text-dark">
                    <h4>📊 Sales & Revenue Report</h4>
                </Card.Header>
                <Card.Body>
                    <p>Track your crop sales, revenue trends, and buyer analytics here.</p>
                    {/* Add charts, filters, and export options later */}
                </Card.Body>
            </Card>
        </Container>
    );
}