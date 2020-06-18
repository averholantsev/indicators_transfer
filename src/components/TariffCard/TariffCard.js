import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Close, Edit, Save } from "@material-ui/icons";
import Text from "../UI/Text/Text";

const useStyles = makeStyles({
  root: {
    margin: "20px 0",
    position: "relative",
  },
  cardPadding: {
    paddingBottom: "16px !important",
    paddingTop: "26px !important",
  },
  row: {
    display: "flex",
  },
  textField: {
    width: "100%",
  },
  selectPadding: {
    display: "flex",
    flexBasis: "13rem",
  },
  buttonClose: {
    position: "absolute",
    padding: "5px",
    top: "5px",
    right: "5px",
  },
  buttonEdit: {
    position: "absolute",
    padding: "5px",
    top: "5px",
    right: "35px",
  },
  buttonIconSuccess: {
    color: "#4caf50",
  },
  buttonIconSuccessDisabled: {
    color: "#9E9E9E",
  },
  buttonSuccess: {
    "&:hover": {
      backgorundColor: "rgba(243, 243, 243, 0.04) !important",
    },
  },
});

const TariffCard = (props) => {
  const classes = useStyles();
  const { id, name, cost, dateEnd, dateStart, tariffValid } = props.tariff;
  const [disabled, setDisabled] = useState(props.disabled);

  return (
    <Card className={classes.root}>
      {disabled ? (
        <IconButton
          className={classes.buttonEdit}
          component="span"
          color="primary"
          onClick={() => setDisabled(false)}
          disableRipple
          disableFocusRipple
        >
          <Edit />
        </IconButton>
      ) : (
        <IconButton
          className={classes.buttonEdit + " " + classes.buttonSuccess}
          component="span"
          color="secondary"
          disabled={!tariffValid}
          onClick={() => {
            setDisabled(true);
            if (id) {
              props.updateItemInTariffs(id);
            } else {
              props.insertItemToTariffs(props.tarriffIndex);
            }
          }}
          disableRipple
          disableFocusRipple
        >
          <Save
            className={
              !tariffValid
                ? classes.buttonIconSuccessDisabled
                : classes.buttonIconSuccess
            }
          />
        </IconButton>
      )}

      <IconButton
        className={classes.buttonClose}
        component="span"
        color="secondary"
        onClick={() => {
          props.handleDeleteDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <Close />
      </IconButton>
      <CardContent className={classes.cardPadding}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.row}>
            <FormControl className={classes.textField}>
              <InputLabel>
                <Text tid="tariffName" />
              </InputLabel>
              <Select
                value={name.value}
                onChange={(event) =>
                  props.updateTariffInState(id, "name", event.target.value)
                }
                disabled={disabled}
                error={!name.valid && name.touched}
              >
                <MenuItem value={"water"}>
                  <Text tid="tariffWater" />
                </MenuItem>
                <MenuItem value={"hot_water"}>
                  <Text tid="tariffHotWater" />
                </MenuItem>
                <MenuItem value={"disposal_water"}>
                  <Text tid="tariffDisposalWater" />
                </MenuItem>
                <MenuItem value={"electricity_day"}>
                  <Text tid="tariffElectricityDay" />
                </MenuItem>
                <MenuItem value={"electricity_night"}>
                  <Text tid="tariffElectricityNight" />
                </MenuItem>
              </Select>
              {!name.valid && name.touched ? (
                <FormHelperText>{name.errorMessage}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.row}>
            <CurrencyTextField
              className={classes.textField}
              label={<Text tid="tariffCost" />}
              currencySymbol="₽"
              value={cost.value}
              minimumValue="0"
              maximumValue="5000"
              disabled={disabled}
              onChange={(event, value) =>
                props.updateTariffInState(id, "cost", value)
              }
              error={!cost.valid && cost.touched}
              helperText={
                !cost.valid && cost.touched ? (
                  <Text tid={cost.errorMessage} />
                ) : null
              }
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6} className={classes.row}>
              <DatePicker
                clearable
                label={<Text tid="tariffDateStart" />}
                format="dd.MM.yyyy"
                value={dateStart.value}
                className={classes.textFieldMargin + " " + classes.textField}
                disabled={disabled}
                onChange={(date) =>
                  props.updateTariffInState(id, "dateStart", date)
                }
                error={!dateStart.valid && dateStart.touched}
                helperText={
                  !dateStart.valid && dateStart.touched ? (
                    <Text tid={dateStart.errorMessage} />
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.row}>
              <DatePicker
                clearable
                label={<Text tid="tariffDateEnd" />}
                format="dd.MM.yyyy"
                value={dateEnd.value}
                className={classes.textField}
                disabled={disabled}
                onChange={(date) =>
                  props.updateTariffInState(id, "dateEnd", date)
                }
                error={!dateEnd.valid && dateEnd.touched}
                helperText={
                  !dateEnd.valid && dateEnd.touched ? (
                    <Text tid={dateEnd.errorMessage} />
                  ) : null
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TariffCard;
