import React, { useState } from "react";
import styles from "./layout.module.css";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customerMenu, riderMenu, vendorMenu } from "../utilis/sidebarMenu";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import userImg from "../assets/img/user-1.jpg";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../store/selector/login.selectors";
import { connect } from "react-redux";

const Sidebar = ({loginstatus}) => {
  const [menuSelected, setMenuSelected] = useState("Dashboard");
  const {currentUser} = loginstatus;
  const setProfileImg = currentUser && currentUser.profileImg && currentUser.profileImg.url ? currentUser.profileImg.url : '';
  return (
    <Paper
      className={styles.sidebar_container}
      sx={{ boxShadow: 2, maxWidth: "100%", mb: 3 }}>
      <MenuList>
        <Link to={`/account/dashboard`} className={styles.sidebar_menu_item}>
          <MenuItem
            sx={{ p: 2, textAlign: "center" }}
            onClick={() => setMenuSelected("Dashboard")}>
            <ListItemIcon>
              <Avatar
                alt={(currentUser.firstName && currentUser.lastName) ?
                  `${currentUser.firstName} ${currentUser.lastName}` :
                  currentUser.username}
                src={setProfileImg}
                sx={{ height: 100, width: 100 }}
              />
            </ListItemIcon>
            <ListItemText>
              <h3>
                {
                  (currentUser.firstName && currentUser.lastName) ?
                  `${currentUser.firstName} ${currentUser.lastName}` :
                  currentUser.username
                }
              </h3>
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        {vendorMenu.map((item, idx) => (
          <Link
            key={`menu-item${idx}`}
            to={item.link}
            className={`${styles.sidebar_menu_item} ${styles.active}`}>
            <MenuItem
              sx={{ p: 2 }}
              selected={menuSelected === item.label}
              onClick={() => setMenuSelected(item.label)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Paper>
  );
};

const userdetails = createStructuredSelector({
  loginstatus: selectCurrentUser,
});

export default connect(userdetails)(Sidebar);
