import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

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
}));

const MenuAppBar = (props) => {
  const classes = useStyles(); 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button
              className={classes.button}
              component={NavLink}
              to="/send-indicators"
            >
              Показания
            </Button>
            <Button className={classes.button} component={NavLink} to="/outlay">
              Расходы
            </Button>
            <Button className={classes.button} component={NavLink} to="/tariffs">
              Тарифы
            </Button>
          </ButtonGroup>
          <div className={classes.grow} />
          <div>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
