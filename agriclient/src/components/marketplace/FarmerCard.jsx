import React from "react";
import { Card, Button } from "react-bootstrap";

export default function FarmerCard({ farmer }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{farmer.name}</Card.Title>
        <Card.Text>
          📍 {farmer.location} <br />
          📞 {farmer.contact}
        </Card.Text>
        <Button variant="success">Contact Farmer</Button>
      </Card.Body>
    </Card>
  );
}