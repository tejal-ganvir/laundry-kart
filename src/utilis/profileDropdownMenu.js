import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReorderIcon from "@mui/icons-material/Reorder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const customerProfileMenu = [
    {
        label: 'Profile',
        link: '/account/profile',
        icon: <AccountCircleIcon fontSize="small" />
    },
    {
        label: 'Orders',
        link: '/account/orders',
        icon: <ReorderIcon fontSize="small" />
    },
    {
        label: 'Logout',
        link: '/account/logout',
        icon: <ExitToAppIcon fontSize="small" />
    }
];

export { customerProfileMenu };