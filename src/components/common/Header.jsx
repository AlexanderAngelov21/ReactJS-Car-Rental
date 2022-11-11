/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../util/customerUtils";
import "./Header.css";

export default function Header() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };
  return (
    
    <Navbar bg="light" expand="lg" className="Header">
      <Container>
        <Navbar.Brand href="#home">Rent-A-Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {user && (
              <Link to="/cars" className="nav-link">
                Cars
              </Link>
            )}
            {user && (
              <Link to="/customers" className="nav-link">
                Customers
              </Link>
            )}
          </Nav>
          <Nav>
            {!user && (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
            {!user && (
              <Link to="/register" className="nav-link">
                Register
              </Link>
            )}
            {user && (
              <a
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={handleLogoutClick}
              >
                Logout
              </a>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}
