import { BASE_API_URL } from "../../constants/constant";
import { postJSON } from "../axiosConfig/api";

export const getProfiledetails = async (data) => {
  console.log(data);
  const response = await postJSON(
    `${BASE_API_URL}functions/getProfileDetails`,
    { laundryId: data },
  );
  return response;
};
export const setProfiledetails = async (data) => {
  console.log(data);
  const response = await postJSON(
    `${BASE_API_URL}functions/getProfileDetails`,
    data,
  );
  return response;
};
