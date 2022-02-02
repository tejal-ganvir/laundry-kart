import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ReorderIcon from "@mui/icons-material/Reorder";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

const customerMenu = [
    {
        label: 'Dashboard',
        link: '/account/dashboard',
        icon: <DashboardIcon fontSize="small" />
    },
    {
        label: 'Profile',
        link: '/account/profile',
        icon: <AccountCircleIcon fontSize="small" />
    },
    {
        label: 'Nearest Lanudry',
        link: '/account/nearest-laundry',
        icon: <CheckroomIcon fontSize="small" />
    },
    {
        label: 'Orders',
        link: '/account/orders',
        icon: <ReorderIcon fontSize="small" />
    },
    {
        label: 'History',
        link: '/account/history',
        icon: <HistoryIcon fontSize="small" />
    },
    {
        label: 'Logout',
        link: '/account/logout',
        icon: <ExitToAppIcon fontSize="small" />
    }
];

const vendorMenu = [
  {
    label: "Dashboard",
    link: "/vendor/dashboard",
    icon: <DashboardIcon fontSize='small' />,
  },
  {
    label: "Profile",
    link: "/vendor/profile",
    icon: <AccountCircleIcon fontSize='small' />,
  },
  {
    label: "Services",
    link: "/vendor/services",
    icon: <CheckroomIcon fontSize='small' />,
  },
  {
    label: "Riders",
    link: "/vendor/riders",
    icon: <TwoWheelerIcon fontSize='small' />,
  },
  {
    label: "Orders",
    link: "/vendor/orders",
    icon: <ReorderIcon fontSize='small' />,
  },
  {
    label: "History",
    link: "/vendor/history",
    icon: <HistoryIcon fontSize='small' />,
  },
  {
    label: "Logout",
    link: "/vendor/logout",
    icon: <ExitToAppIcon fontSize='small' />,
  },
];

const riderMenu = [
  {
    label: "Dashboard",
    link: "/rider/dashboard",
    icon: <DashboardIcon fontSize='small' />,
  },
  {
    label: "Profile",
    link: "/rider/profile",
    icon: <AccountCircleIcon fontSize='small' />,
  },
  {
    label: "Orders",
    link: "/rider/orders",
    icon: <CheckroomIcon fontSize='small' />,
  },

  {
    label: "History",
    link: "/rider/history",
    icon: <HistoryIcon fontSize='small' />,
  },
  {
    label: "Logout",
    link: "/rider/logout",
    icon: <ExitToAppIcon fontSize='small' />,
  },
];
export { customerMenu, vendorMenu, riderMenu };
