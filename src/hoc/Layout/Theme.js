import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme();

theme.typography.h4 = {
  fontSize: "2.125rem",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: "400",
  lineHeight: "1.235",
  letterSpacing: "0.00735em",

  "@media (max-width:767px)": {
    fontSize: "1.75rem",
  },
};

theme.typography.h5 = {
  fontSize: "1.5rem",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: "400",
  lineHeight: "1.334",
  letterSpacing: "0em",

  "@media (max-width:767px)": {
    fontSize: "1.25rem",
  },
};

theme.typography.h6 = {
  fontSize: "1.25rem",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: "400",
  lineHeight: "1.6",
  letterSpacing: "0.0075em",

  "@media (max-width:767px)": {
    fontSize: "1rem",
  },
};
