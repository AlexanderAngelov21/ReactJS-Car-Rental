import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CarCard from "../components/cars/CarCard";
import CarDeletePopup from "../components/cars/CarDeletePopup";
import CarPopup from "../components/cars/CarPopup";
import { addCar, editCar, loadCars } from "../util/carsUtils";
import UserIsAdminElementGuard from "../util/guards/UserIsAdminElementGuard";
import { useModal } from "../util/useModal";

export default function CarsListPage() {
  const [cars, setCars] = useState([]);
  const [showAddCarModal, closeAddCarModal, openAddCarModal] = useModal(false);
  const [selectedCar, setSelectedCar] = useState({});
  const [showDeleteCarModel, closeDeleteCarModal, openDeleteCarModal] =
    useModal(false);
  const [showEditCarModal, closeEditCarModal, openEditCarModal] =
    useModal(false);
  const loadCarsArray = () => {
    loadCars().then((cars) => {
      setCars(cars);
    });
  };
  const handleEditButtonClick = (car) => {
    setSelectedCar(car);
    openEditCarModal();
  };
  const handleDeleteButtonClick = (car) => {
    setSelectedCar(car);
    openDeleteCarModal();
  };
  const handleAddCar = (carData) => {
    addCar(carData).then(() => {
      loadCarsArray();
      closeAddCarModal();
    });
  };
  const handleEditCar = (carData) => {
    editCar(carData).then(() => {
      loadCarsArray();
      closeEditCarModal();
    });
  };

  useEffect(() => {
    loadCarsArray();
  }, []);

  return (
    <Container>
      <div
        style={{
          marginBottom: "2em",
          marginTop: "2em",
        }}
      >
        <Row>
          <Col md={{ span: 4, offset: 5 }}>
            <h1>Cars</h1>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
            <UserIsAdminElementGuard>
              <Button
                style={{
                  backgroundColor: "#f60",
                  color: "white",
                  border: "none",
                }}
                onClick={openAddCarModal}
              >
                Add Car
              </Button>
            </UserIsAdminElementGuard>
          </Col>
        </Row>
      </div>
      <Row>
        {cars.map((car) => (
          <Col md="3" key={car.id} style={{ marginTop: "20px" }}>
            <CarCard
              car={car}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEditButtonClick={handleEditButtonClick}
            />
          </Col>
        ))}
      </Row>
      {showAddCarModal && (
        <CarPopup
          show={showAddCarModal}
          handleClose={closeAddCarModal}
          submitAction={handleAddCar}
          title="Add car"
          car={{}}
        />
      )}
      {showEditCarModal && selectedCar && (
        <CarPopup
          show={showEditCarModal}
          handleClose={closeEditCarModal}
          submitAction={handleEditCar}
          title="Edit car"
          car={selectedCar}
        />
      )}
      <CarDeletePopup
        show={showDeleteCarModel}
        onHide={closeDeleteCarModal}
        car={selectedCar}
        deleteCleanup={loadCarsArray}
      />
    </Container>
  );
}
