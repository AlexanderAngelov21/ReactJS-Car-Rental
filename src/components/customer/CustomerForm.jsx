import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormState } from "../../util/useFormState";
import { equalTo, isEmail, notEmpty } from "../../util/validators";

export default function CustomerForm({ submitAction }) {
  const [formState, handleInputChange, errors, touched] = useFormState(
    {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      repeatPassword: "",
    },
    {
      fullName: [notEmpty],
      email: [notEmpty, isEmail],
      phoneNumber: [notEmpty],
      password: [notEmpty],
      repeatPassword: [
        notEmpty,
        (value, formState) => equalTo(value, formState, "password"),
      ],
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction({
      fullName: formState.fullName,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      password: formState.password,
    });
  };
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullName">
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="repeatPassword"
              value={formState.repeatPassword}
              onChange={handleInputChange}
            />
            {errors.repeatPassword && (
              <Form.Text style={{ color: "red" }}>
                {errors.repeatPassword}
              </Form.Text>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ float: "right" }}
            disabled={
              !(
                touched.length === Object.keys(formState).length &&
                Object.keys(errors).length === 0
              )
            }
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
