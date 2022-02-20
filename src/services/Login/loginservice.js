import axios from "axios";
import { BASE_API_URL } from "../../constants/constant";
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
        'X-Parse-Application-Id': 'RoARvQa9MJl5MitnLouBsGo85mVoFbTvWX42mr7M',
        'X-Parse-REST-API-Key': '0alnWeCtqSMYmLpp8aBzL1V6ppdHbFglPhEYPZ98',
        'Content-Type': 'application/json',
        'X-Parse-Session-Token': token
      }
    });
    return response;
  } catch (error) {
    throw error.response;
  }
}
