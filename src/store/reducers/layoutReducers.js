import { SET_SIDEBAR_STATUS, IS_AUTH_LAYOUT } from "../actionTypes/layoutTypes";

const INIT_STATE = {
    openSidebar: false,
    isAuthLayout: false,
};

const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_SIDEBAR_STATUS:
            return { ...state, openSidebar: action.payload };
        case IS_AUTH_LAYOUT:
            return { ...state, isAuthLayout: action.payload };
        default:
            return { ...state };
    }
};

export default Layout;