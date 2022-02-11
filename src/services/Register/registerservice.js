import axios from "axios";
import RegisterConstants from "./constants";

export const setUserRegistration = async (data) => {
  const response = await axios.post(
    RegisterConstants.URL,
    data,
    RegisterConstants.HEADERS,
  );
  console.log(response);
  return response;
};
