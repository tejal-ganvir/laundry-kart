import { SET_LOCATION_DATA } from "../actionTypes/locationTypes";

export const setLocationData = (data) => ({
    type: SET_LOCATION_DATA,
    payload: data,
});