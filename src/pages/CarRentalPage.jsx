import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { editCar, loadCarById } from "../util/carsUtils";
import { useFormState } from "../util/useFormState";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getCurrentUser } from "../util/customerUtils";
import {
  addRent,
  getRentsForThePast60DaysForCurrentUser,
} from "../util/rentsUtils";
import { useNavigate } from "react-router-dom";
import { notEmpty } from "../util/validators";

export default function CarRentalPage() {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [formState, handleInputChange, errors] = useFormState(
    {
      startDate: "",
      endDate: "",
    },
    {
      startDate: [notEmpty],
      endDate: [
        notEmpty,
        (value, formState) => ({
          valid: moment(value).isAfter(moment(formState.startDate)),
          message: "End date must be after start date",
        }),
      ],
    }
  );
  const [rentsInThePast60Days, setRentsInThePast60Days] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCarById(carId).then((cars) => setCar(cars[0]));
  }, [carId]);

  useEffect(() => {
    getRentsForThePast60DaysForCurrentUser().then((rents) => {
      console.log(rents);
      setRentsInThePast60Days(rents);
    });
  }, []);

  const calculateDifferenceBetweenStartDateAndEndDate = () => {
    const startDateMoment = moment(formState.startDate);
    const endDateMoment = moment(formState.endDate);
    return endDateMoment.diff(startDateMoment, "days");
  };

  const calculateDiscount = () => {
    if (rentsInThePast60Days.length >= 3) {
      return 15;
    }
    const daysDifference = calculateDifferenceBetweenStartDateAndEndDate();
    if (daysDifference > 10) {
      return 10;
    } else if (daysDifference > 5) {
      return 7;
    } else if (daysDifference > 3) {
      return 5;
    } else {
      return 0;
    }
  };

  const calculateTotal = () => {
    const daysDifference = calculateDifferenceBetweenStartDateAndEndDate();
    const totalWithoutDiscount = daysDifference * car.pricePerDay;
    const discount = calculateDiscount();
    if (discount === 0) {
      return totalWithoutDiscount;
    }
    return totalWithoutDiscount * (1 - discount / 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = calculateTotal();
    const user = getCurrentUser();
    const rentCar = {
      ...car,
      count: car.count - 1,
    };
    const rent = {
      startDate: formState.startDate,
      endDate: formState.endDate,
      car: rentCar,
      customer: user,
      total,
    };
    await addRent(rent);
    await editCar(rentCar);
    navigate("/cars");
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <div style={{ textAlign: "center" }}>
        <h1>
          Rent {car.brand} {car.model}
        </h1>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name="brand"
                value={car.brand}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                name="model"
                value={car.model}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="constructionYear">
              <Form.Label>Construction year</Form.Label>
              <Form.Control
                name="constructionYear"
                value={car.constructionYear}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fuelType">
              <Form.Label>Fuel type</Form.Label>
              <Form.Control
                name="constructionYear"
                value={car.fuelType}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pricePerDay">
              <Form.Label>Price per day</Form.Label>
              <Form.Control
                name="pricePerDay"
                value={car.pricePerDay}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="count">
              <Form.Label>Available cars</Form.Label>
              <Form.Control
                name="count"
                value={car.count}
                disabled={true}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={formState.startDate}
                onChange={(date) =>
                  handleInputChange({
                    target: { name: "startDate", value: date },
                  })
                }
                className="form-control"
                name="startDate"
              />
              {errors.startDate && (
                <Form.Text style={{ color: "red" }}>
                  {errors.startDate}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={formState.endDate}
                onChange={(date) =>
                  handleInputChange({
                    target: { name: "endDate", value: date },
                  })
                }
                className="form-control"
                name="endDate"
              />
              {errors.endDate && (
                <Form.Text style={{ color: "red" }}>{errors.endDate}</Form.Text>
              )}
            </Form.Group>
            <div className="mb-3">
              <span>
                Discount{" : "}
                {calculateDiscount() === 0
                  ? "No discount"
                  : `${calculateDiscount()} %`}
              </span>
              <br />
              <span>
                {rentsInThePast60Days.length > 3 ? "VIP CUSTOMER" : ""}
              </span>
            </div>
            {formState.startDate && formState.endDate && (
              <div className="mb-3">
                <span>Total: {calculateTotal()}</span>
              </div>
            )}
            {car.count > 0 ? (
              <Button
                className="orange-button"
                type="submit"
                style={{ float: "right" }}
                disabled={
                  !formState.startDate ||
                  !formState.endDate ||
                  Object.keys(errors).length > 0
                }
              >
                Submit Rent
              </Button>
            ) : (
              <span style={{ float: "right" }}>Car not available</span>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
