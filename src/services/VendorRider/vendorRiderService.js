import { BASE_API_URL } from "../../constants/constant";
import { postJSON } from "../axiosConfig/api";

export const getVendorRiderCreatedetails = async (data) => {
  console.log(data);
  const response = await postJSON(`https://laundrykart.b4a.io/users`, data);
  console.log(response);
  return response;
};

export const getVendorRideretails = async () => {
  const response = await postJSON(
    `${BASE_API_URL}functions/getAllRidersDetails`,
  );
  return response;
};
