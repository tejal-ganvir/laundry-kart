import React from 'react';
import styles from './layout.module.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { customerMenu } from '../utilis/sidebarMenu';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import userImg from '../assets/img/user-1.jpg'

const Sidebar = (props) => {
  return (
    <Paper className={styles.sidebar_container} sx={{ boxShadow: 2, maxWidth: '100%', mb: 3}}>
      <MenuList>
          <Link to={`/account/dashboard`} className={styles.sidebar_menu_item}>
            <MenuItem sx={{p: 2, textAlign:'center'}}>
                <ListItemIcon >
                  <Avatar alt="Tejal Ganvir" src={userImg} sx={{height:100 , width: 100}} />
                </ListItemIcon>
                <ListItemText><h3>Angelina Jolie</h3></ListItemText>
            </MenuItem>
          </Link>
          <Divider />
        {
          customerMenu.map((item, idx) => (
            <Link key={`menu-item${idx}`} to={item.link} className={styles.sidebar_menu_item}>
              <MenuItem sx={{p: 2}}>
                  <ListItemIcon >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                  {/* <Typography variant="body2" color="text.primary">
                    ⌘X
                  </Typography> */}
              </MenuItem>
            </Link>
          ))
        }
      </MenuList>
    </Paper>
  );
};

export default Sidebar;
