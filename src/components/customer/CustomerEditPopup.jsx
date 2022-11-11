import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { editCustomer } from "../../util/customerUtils";
import { useFormState } from "../../util/useFormState";
import { isEmail, notEmpty } from "../../util/validators";

export default function CustomerEditPopup({
  show,
  handleClose,
  customer,
  submitCleanUp,
}) {
  const [formState, handleInputChange, errors] = useFormState(customer, {
    fullName: [notEmpty],
    email: [notEmpty, isEmail],
    phoneNumber: [notEmpty],
  });
  const handleSubmit = (e) => {
    console.log("HERE");
    e.preventDefault();
    editCustomer(formState).then(() => {
      submitCleanUp();
      handleClose();
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              value={formState.fullName}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your name here"
            />
            {errors.fullName && (
              <Form.Text style={{ color: "red" }}>{errors.fullName}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={formState.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <Form.Text style={{ color: "red" }}>
                {errors.phoneNumber}
              </Form.Text>
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
            <Button
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Save changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
