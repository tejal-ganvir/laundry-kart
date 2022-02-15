import { SET_LOCATION_DATA } from "../actionTypes/locationTypes";

const INIT_STATE = {
    data : {}
};

const LocationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_LOCATION_DATA:
            return { ...state, data: action.payload };
        default:
            return { ...state };
    }
};

export default LocationReducer;