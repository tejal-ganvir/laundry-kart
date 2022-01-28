import { SET_SIDEBAR_STATUS } from "../actionTypes/layoutTypes";

export const setOpenSidebar = (status) => ({
    type: SET_SIDEBAR_STATUS,
    payload: status,
});