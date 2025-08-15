import React from "react";
import { Card, Button } from "react-bootstrap";

export default function BuyerCard({ buyer }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{buyer.name}</Card.Title>
        <Card.Text>
          📍 {buyer.location} <br />
          📞 {buyer.contact}
        </Card.Text>
        <Button variant="primary">Connect with Buyer</Button>
      </Card.Body>
    </Card>
  );
}