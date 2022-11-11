import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteCustomer } from "../../util/customerUtils";

export default function CustomerDeletePopup({
  customer,
  deleteCleanup,
  show,
  handleClose,
}) {
  const handleDeleteClick = async () => {
    await deleteCustomer(customer.id);
    deleteCleanup();
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this customer?</p>
        <p>{`Name: ${customer.fullName} -  Email: ${customer.email}  - Phone Number: ${customer.phoneNumber}`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete customer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
