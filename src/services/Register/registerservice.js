import axios from "axios";
import { postJSON } from "../axiosConfig/api";

export const setUserRegistration = async (data) => {
  try {
    const response = await postJSON(`users`, data);
    return response;
  } catch (error) {
    throw error.response;
  }
};
