import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
    width: "100%",
  },
});

const StepTwo = (props) => {
  const classes = useStyles();
  const {
    prevIndicatorsDate,
    electricityDay,
    electricityNight,
    kitchenColdWater,
    kitchenHotWater,
    bathroomColdWater,
    bathroomHotWater,
  } = props.prevIndicators;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            clearable
            className={classes.field}
            disabled={props.isDisabled}
            label="Дата первичных показателей"
            format="dd.MM.yyyy"
            value={prevIndicatorsDate.value}
            onChange={(date) =>
              props.updatePrevIndicatorsInState("prevIndicatorsDate", date)
            }
            error={!prevIndicatorsDate.valid && prevIndicatorsDate.touched}
            helperText={
              !prevIndicatorsDate.valid && prevIndicatorsDate.touched
                ? prevIndicatorsDate.errorMessage
                : null
            }
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Электроэнергия: День"
          currencySymbol=""
          value={electricityDay.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("electricityDay", value)
          }
          error={!electricityDay.valid && electricityDay.touched}
          helperText={
            !electricityDay.valid && electricityDay.touched
              ? electricityDay.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Электроэнергия: Ночь"
          currencySymbol=""
          value={electricityNight.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("electricityNight", value)
          }
          error={!electricityNight.valid && electricityNight.touched}
          helperText={
            !electricityNight.valid && electricityNight.touched
              ? electricityNight.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Кухня: Холодная вода"
          currencySymbol=""
          value={kitchenColdWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("kitchenColdWater", value)
          }
          error={!kitchenColdWater.valid && kitchenColdWater.touched}
          helperText={
            !kitchenColdWater.valid && kitchenColdWater.touched
              ? kitchenColdWater.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Кухня: Горячая вода"
          currencySymbol=""
          value={kitchenHotWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("kitchenHotWater", value)
          }
          error={!kitchenHotWater.valid && kitchenHotWater.touched}
          helperText={
            !kitchenHotWater.valid && kitchenHotWater.touched
              ? kitchenHotWater.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Ванная: Холодная вода"
          currencySymbol=""
          value={bathroomColdWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("bathroomColdWater", value)
          }
          error={!bathroomColdWater.valid && bathroomColdWater.touched}
          helperText={
            !bathroomColdWater.valid && bathroomColdWater.touched
              ? bathroomColdWater.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Ванная: Горячая вода"
          currencySymbol=""
          value={bathroomHotWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("bathroomHotWater", value)
          }
          error={!bathroomHotWater.valid && bathroomHotWater.touched}
          helperText={
            !bathroomHotWater.valid && bathroomHotWater.touched
              ? bathroomHotWater.errorMessage
              : null
          }
        />
      </Grid>
    </Grid>
  );
};

export default StepTwo;
