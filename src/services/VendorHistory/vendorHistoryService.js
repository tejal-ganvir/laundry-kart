import { BASE_API_URL } from "../../constants/constant";
import { postJSON } from "../axiosConfig/api";

export const getVendorHistorydetails = async (data) => {
  console.log(data);
  const response = await postJSON(
    `${BASE_API_URL}functions/getProfileDetails`,
    { laundryId: data },
  );
  console.log(response);
  return response;
};
