import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import CustomerDeletePopup from "../components/customer/CustomerDeletePopup";
import CustomerEditPopup from "../components/customer/CustomerEditPopup";
import { loadAllCustomers } from "../util/customerUtils";
import { useModal } from "./../util/useModal";
import UserIsAdminElementGuard from "../util/guards/UserIsAdminElementGuard";

export default function CustomersListPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [
    showDeleteCustomerModal,
    closeDeleteCustomerModal,
    openDeleteCustomerModal,
  ] = useModal(false);
  const [showEditCustomerModal, closeEditCustomerModal, openEditCustomerModal] =
    useModal(false);

  const openDeletePopup = (customer) => {
    setSelectedCustomer(customer);
    openDeleteCustomerModal();
  };

  const openEditPopup = (customer) => {
    setSelectedCustomer(customer);
    openEditCustomerModal();
  };

  const loadCustomers = () => {
    loadAllCustomers().then((res) => setCustomers(res));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <Container>
      <div
        style={{ textAlign: "center", marginBottom: "2em", marginTop: "2em" }}
      >
        <h1>Customers</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <UserIsAdminElementGuard>
              <th>Actions</th>
            </UserIsAdminElementGuard>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <UserIsAdminElementGuard>
                <td>
                  <i
                    className="fa fa-pencil"
                    style={{
                      margin: "0 10px",
                      color: "#0d6efd",
                      cursor: "pointer",
                    }}
                    onClick={() => openEditPopup(customer)}
                  ></i>
                  <i
                    className="fa-solid fa-trash-can"
                    style={{ color: "#dc3545", cursor: "pointer" }}
                    onClick={() => openDeletePopup(customer)}
                  ></i>
                </td>
              </UserIsAdminElementGuard>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CustomerDeletePopup
        customer={selectedCustomer}
        handleClose={closeDeleteCustomerModal}
        show={showDeleteCustomerModal}
        deleteCleanup={loadCustomers}
      />
      {showEditCustomerModal && (
        <CustomerEditPopup
          customer={selectedCustomer}
          handleClose={closeEditCustomerModal}
          show={showEditCustomerModal}
          submitCleanUp={loadCustomers}
        />
      )}
    </Container>
  );
}
