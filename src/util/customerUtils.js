const apiUrl = "http://localhost:3005/customers";

export const registerCustomer = async (customer) => {
  const customerWithSameEmailResponse = await fetch(
    `${apiUrl}?email=${customer.email}`
  );
  const customersWithSameEmail = await customerWithSameEmailResponse.json();
  if (customersWithSameEmail.length > 0) {
    throw new Error("Customer with same email exists");
  }
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loadAllCustomers = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const login = async (userData) => {
  const users = await loadAllCustomers();
  const loggedInUser = users.find(
    (user) =>
      user.email === userData.email && user.password === userData.password
  );
  if (!loggedInUser) {
    throw new Error("Invalid username/password");
  }
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  return loggedInUser;
};

export const getCurrentUser = () => {
  const currentUserJsonString = localStorage.getItem("user");
  return currentUserJsonString ? JSON.parse(currentUserJsonString) : null;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const deleteCustomer = (customerId) => {
  return fetch(`${apiUrl}/${customerId}`, {
    method: "DELETE",
  });
};

export const editCustomer = (customer) => {
  return fetch(`${apiUrl}/${customer.id}`, {
    method: "PUT",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
