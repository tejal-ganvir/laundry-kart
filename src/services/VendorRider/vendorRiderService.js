import { BASE_API_URL } from "../../constants/constant";
import { postJSON } from "../axiosConfig/api";

export const getVendorRiderCreatedetails = async (data) => {
  const response = await postJSON(`https://laundrykart.b4a.io/users`, data);
  return response;
};

export const getVendorRideretails = async () => {
  const response = await postJSON(
    `${BASE_API_URL}functions/getAllRidersDetails`,
  );
  return response;
};
