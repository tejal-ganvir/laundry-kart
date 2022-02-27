import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { Divider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { customerProfileMenu, customerVendorMenu } from '../utilis/profileDropdownMenu';

const ProfileDropdown = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const profileMenu = customerProfileMenu;
    const open = Boolean(anchorEl);
    const {isLogin, currentUser} = user;
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setProfileImg = currentUser && currentUser.profileImg && currentUser.profileImg.url ? currentUser.profileImg.url : '';
    const role = currentUser && currentUser.role ? currentUser.role : '';

    const dropdownMenu = (role === 'laundry') ? customerVendorMenu : customerProfileMenu;

  return (
    <React.Fragment>
      <IconButton
        onClick={isLogin ? handleClick : () => navigate('login')}
        size="small"
        sx={{ ml: 2, borderRadius: 0 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        >
            <Avatar sx={{ width: 40, height: 40 }} src={setProfileImg} />
            {isLogin &&
                <Typography sx={{fontSize: 13, fontWeight: 'bold', mx: 1 }}>
                    {
                        (currentUser.firstName && currentUser.lastName) ?
                        `${currentUser.firstName} ${currentUser.lastName}` :
                        currentUser.username
                    } 
                    &nbsp;<KeyboardArrowDownIcon sx={{height: 15, width: 15}} />
                </Typography>
            }
        </IconButton>

        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                py: 1,
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {
                dropdownMenu.map((menu, idx) => (
                    <div key={`profile-dropdown-${menu.label}`}>
                        <MenuItem component={Link} to={menu.link} sx={{minWidth: 150, textAlign: 'center'}} >
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            {menu.label}
                        </MenuItem>
                        {(dropdownMenu.length - 1 > idx) && <Divider />}
                    </div>
                ))
            }
        </Menu>
      </React.Fragment>
  );
};

export default ProfileDropdown;
