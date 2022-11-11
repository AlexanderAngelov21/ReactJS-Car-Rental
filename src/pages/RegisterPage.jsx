import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CustomerForm from "../components/customer/CustomerForm";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../util/customerUtils";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleUserRegistration = async (formData) => {
    try {
      await registerCustomer(formData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <div style={{ textAlign: "center" }}>
        <h1>Register</h1>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <CustomerForm submitAction={handleUserRegistration} />
    </Container>
  );
}
