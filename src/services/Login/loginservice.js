import axios from "axios";
import {baseURL,headers} from "./constants";

export const getLoginUser = async (data) => {
  const response = await axios.get(`${baseURL}login?username=${data.username}&password=${data.password}`,
    {
      headers,
    }
  );
  return response;
};
