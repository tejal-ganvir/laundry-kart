import { fetchJSON } from "../axiosConfig/api";

export const getLoginUser = async (data) => {
  const response = await fetchJSON(`login?username=${data.username}&password=${data.password}`);
  return response;
};
