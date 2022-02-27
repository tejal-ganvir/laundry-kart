import { GET_LAUNDRY_LIST, LAUNDRY_INFO_SUCCESS, LAUNDRY_LIST_FAILED, LAUNDRY_LIST_SUCCESS } from "../actionTypes/laundryTypes";

const INIT_STATE = {
    data: [],
    loading: false,
    error: null,
    vendorLaundry: [],
};

const LaundryReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LAUNDRY_LIST:
            return { ...state, loading: true };
        case LAUNDRY_LIST_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case LAUNDRY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LAUNDRY_INFO_SUCCESS:
            return { ...state, vendorLaundry: action.payload };
        default:
            return { ...state };
    }
};

export default LaundryReducers;