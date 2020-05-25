import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const APP_MENU_LIST = [
  { name: "Показания", path: "/send-indicators" },
  { name: "Расходы", path: "/outlay" },
  { name: "Тарифы", path: "/tariffs" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  const [sectionTitle, setSectionTitle] = useState("Тарифы");
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
        <SwipeableDrawer
          className={classes.drawer}
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => console.log("Список открыт")}
          disableBackdropTransition={true}
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
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
