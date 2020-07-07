import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import LanguageSelector from "../Languages/LanguageSelector";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ExitToApp,
  Menu,
  ListAlt,
  EventNote,
  MonetizationOn,
  AccountCircle,
} from "@material-ui/icons";
import Text from "../UI/Text/Text";

const APP_MENU_LIST = [
  { name: "indications", path: "/send-indicators", icon: <ListAlt /> },
  { name: "expenses", path: "/outlay", icon: <EventNote /> },
  { name: "tariffs", path: "/tariffs", icon: <MonetizationOn /> },
  { name: "profile", path: "/profile", icon: <AccountCircle /> },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
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

  let sectionTitleName = "indications";
  switch (window.location.hash) {
    case "#/send-indicators":
      sectionTitleName = "indications";
      break;
    case "#/outlay":
      sectionTitleName = "expenses";
      break;
    case "#/tariffs":
      sectionTitleName = "tariffs";
      break;
    case "#/profile":
      sectionTitleName = "profile";
      break;
    default:
      break;
  }

  const [sectionTitle, setSectionTitle] = useState(
    <Text tid={sectionTitleName} />
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const titleShow = useMediaQuery("(min-width:525px)");

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
            <Menu />
          </IconButton>
          <Typography variant="h6">{sectionTitle}</Typography>
          <div className={classes.grow} />
          <LanguageSelector theme="light" />
          {props.userDetails && titleShow ? (
            <Typography variant="h6">
              {props.userDetails.firstName + " " + props.userDetails.lastName}
            </Typography>
          ) : null}

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={NavLink}
            to="/logout"
          >
            <ExitToApp />
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
                  setSectionTitle(<Text tid={item.name} />);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Text tid={item.name} />} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
