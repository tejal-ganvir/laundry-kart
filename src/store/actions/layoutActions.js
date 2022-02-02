import { SET_SIDEBAR_STATUS, IS_AUTH_LAYOUT } from "../actionTypes/layoutTypes";

export const setOpenSidebar = (status) => ({
    type: SET_SIDEBAR_STATUS,
    payload: status,
});

export const setAuthLayout = (status) => ({
    type: IS_AUTH_LAYOUT,
    payload: status,
});