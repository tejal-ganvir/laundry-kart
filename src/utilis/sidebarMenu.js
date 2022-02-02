import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ReorderIcon from '@mui/icons-material/Reorder';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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

export {customerMenu};