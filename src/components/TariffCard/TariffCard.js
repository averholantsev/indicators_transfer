import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

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
    flexGrow: 1,
  },
  textFieldMargin: {
    marginRight: "15px",
    marginBottom: "15px",
  },
  selectPadding: {
    display: 'flex',
    flexBasis: "13rem"
  },
  buttonClose: {
    position: "absolute",
    right: "0",
  },
  buttonEdit: {
    position: "absolute",
    right: "30px",
  },
  buttonIconSuccess: {
    color: "#4caf50",
  },
  buttonSuccess: {
    "&:hover": {
      backgorundColor: "rgba(243, 243, 243, 0.04) !important",
    },
  },
});

const TariffCard = (props) => {
  const classes = useStyles();
  const { id, name, cost, dateEnd, dateStart } = props.tariff;
  const [disabled, setDisabled] = useState(props.disabled);

  return (
    <Card className={classes.root}>
      {disabled ? (
        <IconButton
          className={classes.buttonEdit}
          aria-label="Изменить"
          component="span"
          color="primary"
          onClick={() => setDisabled(false)}
          disableRipple
          disableFocusRipple
        >
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton
          className={classes.buttonEdit + " " + classes.buttonSuccess}
          aria-label="Сохранить"
          component="span"
          color="secondary"
          onClick={() => {
            setDisabled(true);
            if (id) {
              props.updateItemInTariffs(id);
            } else {
              props.insertItemToTariffs();
            }
          }}
          disableRipple
          disableFocusRipple
        >
          <SaveIcon className={classes.buttonIconSuccess} />
        </IconButton>
      )}

      <IconButton
        className={classes.buttonClose}
        aria-label="Удалить"
        component="span"
        color="secondary"
        onClick={() => {
          props.handleDeleteDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <CloseIcon />
      </IconButton>
      <CardContent className={classes.cardPadding}>
        <Grid container>
          <Grid item xs={12} className={classes.row}>
            <FormControl className={classes.textFieldMargin + " " + classes.textField + " " + classes.selectPadding}>
              <InputLabel>Наименование</InputLabel>
              <Select
                value={name}
                onChange={(event) =>
                  props.updateTariffInState(id, "name", event.target.value)
                }
                disabled={disabled}
              >
                <MenuItem value={"water"}>Подача воды</MenuItem>
                <MenuItem value={"hot_water"}>Подогрев воды</MenuItem>
                <MenuItem value={"disposal_water"}>Водоотведение</MenuItem>
                <MenuItem value={"electricity_day"}>Электро-ия. день</MenuItem>
                <MenuItem value={"electricity_night"}>Электро-ия. ночь</MenuItem>
              </Select>
            </FormControl>
            <CurrencyTextField
              className={classes.textField}
              label="Тариф"
              currencySymbol="₽"
              value={cost}
              minimumValue="0"
              maximumValue="5000"
              disabled={disabled}
              onChange={(event, value) =>
                props.updateTariffInState(id, "cost", value)
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Действителен c"
                format="dd.MM.yyyy"
                value={dateStart}
                className={classes.textFieldMargin + " " + classes.textField}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disabled={disabled}
                onChange={(date) =>
                  props.updateTariffInState(id, "dateStart", date)
                }
              />

              <KeyboardDatePicker
                label="Действителен по"
                format="dd.MM.yyyy"
                value={dateEnd}
                className={classes.textField}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disabled={disabled}
                onChange={(date) =>
                  props.updateTariffInState(id, "dateEnd", date)
                }
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TariffCard;
