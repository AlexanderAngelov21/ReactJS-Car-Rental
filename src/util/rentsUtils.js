import { getCurrentUser } from "./customerUtils";
import moment from "moment";

const apiUrl = "http://localhost:3005/rents";

export const addRent = (rent) => {
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(rent),
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const getRentsForThePast60DaysForCurrentUser = async () => {
  const user = getCurrentUser();
  const currentDay = new Date().toISOString();
  const before60Days = moment(currentDay)
    .subtract(60, "days")
    .toDate()
    .toISOString();
  console.log(before60Days);
  const res = await fetch(
    `${apiUrl}?customer.id=${user.id}&startDate_gte=${before60Days}&endDate_lte=${currentDay}`
  );
  return await res.json();
};
