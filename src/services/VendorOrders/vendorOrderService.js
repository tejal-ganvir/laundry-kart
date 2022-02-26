import { BASE_API_URL } from "../../constants/constant";
import { postJSON } from "../axiosConfig/api";

export const setOrderStatus = async (data) => {
  console.log(data);
  const response = await postJSON(
    `${BASE_API_URL}functions/ChangeOrderStatus`,
    data,
  );
  console.log(response);
  return response;
};
