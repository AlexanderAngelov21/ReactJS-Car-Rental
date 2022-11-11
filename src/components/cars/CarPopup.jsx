import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { useFormState } from "../../util/useFormState";
import { greaterThan, notEmpty, oneOf } from "../../util/validators";

export default function CarPopup({
  show,
  handleClose,
  submitAction,
  title,
  car,
}) {
  const initalFormState =
    Object.keys(car).length > 0
      ? car
      : {
          brand: "",
          model: "",
          type: "economy",
          fuelType: "petrol",
          numberOfSeats: 0,
          pricePerDay: 0,
          count: 0,
          imageUrl: "",
          constructionYear: 2022,
        };
  const [formState, handleInputChange, errors] = useFormState(initalFormState, {
    brand: [notEmpty],
    model: [notEmpty],
    type: [
      (value) => oneOf(value, ["economy", "estate", "luxury", "SUV", "cargo"]),
    ],
    fuelType: [
      (value) => oneOf(value, ["petrol", "diesel", "hybrid", "electric"]),
    ],
    pricePerDay: [(value) => greaterThan(value, 0)],
    numberOfSeats: [(value) => greaterThan(value, 0)],
    count: [(value) => greaterThan(value, 0)],
    imageUrl: [notEmpty],
    constructionYear: [(value) => greaterThan(value, 0)],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction(formState);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brand"
              value={formState.brand}
              onChange={handleInputChange}
              type="text"
            />
            {errors.brand && (
              <Form.Text style={{ color: "red" }}>{errors.brand}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              name="model"
              value={formState.model}
              onChange={handleInputChange}
              type="text"
            />
            {errors.model && (
              <Form.Text style={{ color: "red" }}>{errors.model}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="constructionYear">
            <Form.Label>Construction Year</Form.Label>
            <Form.Control
              name="constructionYear"
              value={formState.constructionYear}
              onChange={handleInputChange}
              type="number"
            />
            {errors.constructionYear && (
              <Form.Text style={{ color: "red" }}>
                {errors.constructionYear}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formState.type}
              onChange={handleInputChange}
            >
              <option value="economy">Economy</option>
              <option value="estate">Estate</option>
              <option value="luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="cargo">Cargo</option>
            </Form.Select>
            {errors.type && (
              <Form.Text style={{ color: "red" }}>{errors.type}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="fuelType">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Select
              name="fuelType"
              value={formState.fuelType}
              onChange={handleInputChange}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </Form.Select>
            {errors.fuelType && (
              <Form.Text style={{ color: "red" }}>{errors.fuelType}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="numberOfSeats">
            <Form.Label>Number of seats</Form.Label>
            <Form.Control
              name="numberOfSeats"
              type="number"
              value={formState.numberOfSeats}
              onChange={handleInputChange}
            />
            {errors.numberOfSeats && (
              <Form.Text style={{ color: "red" }}>
                {errors.numberOfSeats}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="imageUrl">
            <Form.Label>Picture url</Form.Label>
            <Form.Control
              name="imageUrl"
              type="text"
              value={formState.imageUrl}
              onChange={handleInputChange}
            />
            {errors.imageUrl && (
              <Form.Text style={{ color: "red" }}>{errors.imageUrl}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="pricePerDay">
            <Form.Label>Price per day</Form.Label>
            <Form.Control
              name="pricePerDay"
              type="number"
              value={formState.pricePerDay}
              onChange={handleInputChange}
            />
            {errors.pricePerDay && (
              <Form.Text style={{ color: "red" }}>
                {errors.pricePerDay}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="count">
            <Form.Label>Count</Form.Label>
            <Form.Control
              name="count"
              type="number"
              value={formState.count}
              onChange={handleInputChange}
            />
            {errors.count && (
              <Form.Text style={{ color: "red" }}>{errors.count}</Form.Text>
            )}
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
