import React from "react";
import { Link } from "react-router-dom";

export default function HomePge() {
  return (
    <div class="p-5 mb-4 bg-light rounded-3 mt-4">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Rent a car</h1>
        <p class="col-md-8 fs-4">
          Car rental Project for FMI PU React course made by Aleksandar Angelov. Admin customer can add/edit/delete cars and
          edit/delete customers. Regular customers can see list of available
          cars and rent them. In order to see our list of cars please{" "}
          <Link to="/register">Register</Link> or <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
