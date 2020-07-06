import React, { useContext } from "react";
import { languageOptions } from "./Dictionaries";
import { LanguageContext } from "./Language";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rootLight: {
    paddingTop: "1px",
    marginRight: "5px",
    "& .MuiInput-underline:before": {
      display: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "none",
    },
  },
  selectLight: {
    color: "white",
  },
  rootDark: {
    paddingTop: "1px",
    marginRight: "5px",
    "& .MuiInput-underline:before": {
      display: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "#757575",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "none",
    },
  },
  selectDark: {
    color: "#757575",
  },
});

export default function LanguageSelector(props) {
  const classes = useStyles();
  const languageContext = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    const selectedLanguage = languageOptions.find(
      (item) => item.id === event.target.value
    );
    // set selected language by calling context method
    languageContext.setLanguage(selectedLanguage);  
    localStorage.setItem("languageIndex", languageOptions.indexOf(selectedLanguage));
  };

  return (
    <FormControl className={props.theme === "light" ? classes.rootLight: classes.rootDark}>
      <Select
        value={languageContext.language.id}
        onChange={handleLanguageChange}
        className={props.theme === "light" ? classes.selectLight: classes.selectDark}
      >
        {languageOptions.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
