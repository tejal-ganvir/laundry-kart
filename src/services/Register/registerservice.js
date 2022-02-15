import axios from "axios";
import { baseURL, headers } from "../constants";

export const setUserRegistration = async (data) => {
  const response = await axios.post(`${baseURL}users`, data, {
    headers,
  });
  return response;
};
