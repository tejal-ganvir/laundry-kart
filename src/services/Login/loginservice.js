import axios from "axios";
import { APPLICATION_ID, BASE_API_URL, REST_API_KEY } from "../../constants/constant";
import { fetchJSON } from "../axiosConfig/api";

export const getLoginUser = async (data) => {
  try {
    const response = await fetchJSON(`login?username=${data.username}&password=${data.password}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getUserByToken = async (token) => {
  try {
    const response = axios.get(`${BASE_API_URL}users/me`, {
      headers: {
        'X-Parse-Application-Id': APPLICATION_ID,
        'X-Parse-REST-API-Key': REST_API_KEY,
        'Content-Type': 'application/json',
        'X-Parse-Session-Token': token
      }
    });
    return response;
  } catch (error) {
    throw error.response;
  }
}
