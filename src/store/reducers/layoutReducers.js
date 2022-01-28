import { SET_SIDEBAR_STATUS } from "../actionTypes/layoutTypes";

const INIT_STATE = {
    openSidebar: false,
};

const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_SIDEBAR_STATUS:
            return { ...state, openSidebar: action.payload };
        default:
            return { ...state };
    }
};

export default Layout;