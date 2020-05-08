import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "15px",
    boxShadow: "none",
  },
  label: {
    fontSize: "1rem",
  }
});

const TabUI = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeCurrentYear(props.tabsList[newValue]);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {props.tabsList.map(item => <Tab key={item} label={item} className={classes.label} />)}
      </Tabs>
    </Paper>
  );
};

export default TabUI;