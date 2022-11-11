import { Modal, Button } from "react-bootstrap";
import React from "react";
import { deleteCar } from "../../util/carsUtils";

export default function CarDeletePopup({ show, onHide, car, deleteCleanup }) {
  const handleDeleteClick = async () => {
    await deleteCar(car.id);
    deleteCleanup();
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this car?</p>
        <p>{`${car.brand} ${car.model} ${car.constructionYear}`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete car
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
