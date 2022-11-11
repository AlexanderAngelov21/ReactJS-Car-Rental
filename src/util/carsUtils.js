const apiUrl = "http://localhost:3005/vehicles";

export const loadCars = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const addCar = (car) => {
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCar = (carId) => {
  return fetch(`${apiUrl}/${carId}`, {
    method: "DELETE",
  });
};

export const editCar = (car) => {
  return fetch(`${apiUrl}/${car.id}`, {
    method: "PUT",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loadCarById = (carId) =>
  fetch(`${apiUrl}?id=${carId}`).then((res) => res.json());
