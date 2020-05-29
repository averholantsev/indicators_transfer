import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ListAltIcon from '@material-ui/icons/ListAlt';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const APP_MENU_LIST = [
  { name: "Показания", path: "/send-indicators", icon: <ListAltIcon/> },
  { name: "Расходы", path: "/outlay", icon: <EventNoteIcon/> },
  { name: "Тарифы", path: "/tariffs", icon: <MonetizationOnIcon/> },
  { name: "Профиль", path: "/profile", icon: <AccountCircleIcon/> },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  button: {
    "&:hover": {
      color: "white",
    },
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

const MenuAppBar = (props) => {
  const classes = useStyles();
  const [sectionTitle, setSectionTitle] = useState("Показания");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {sectionTitle}
          </Typography>
          <div className={classes.grow} />

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={NavLink}
            to="/logout"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <List className={classes.list}>
            {APP_MENU_LIST.map((item) => (
              <ListItem
                button
                key={item.name}
                component={NavLink}
                to={item.path}
                onClick={() => {
                  setOpenDrawer(false);
                  setSectionTitle(item.name);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
