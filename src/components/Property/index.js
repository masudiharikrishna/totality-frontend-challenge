import React from 'react';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Carousel } from 'react-bootstrap';

const Property = ({ property, addToCart }) => (
    <Card style={{ width: '18rem', margin: '1rem' }}>
        <Carousel>
            {property.images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Slide ${index}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
        <Card.Body>
            <Card.Title>{property.title}</Card.Title>
            <Card.Text>{property.description}</Card.Text>
            <Card.Text>Location: {property.address.city}</Card.Text>
            <Card.Text>Bedrooms: {property.bedrooms}</Card.Text>
            <Card.Text>Area: {property.squareFeet} ft</Card.Text>
            <Card.Text>Price: ₹{property.price}</Card.Text>
            <Button variant="btn btn-primary" onClick={() => addToCart(property)}>Add to Cart</Button>
        </Card.Body>
    </Card>
);

export default Property;
