import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Grid from "@material-ui/core/Grid";
import Text from "../UI/Text/Text";

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
            label={<Text tid="prevIndicatorsDate" />}
            format="dd.MM.yyyy"
            value={prevIndicatorsDate.value}
            onChange={(date) =>
              props.updatePrevIndicatorsInState("prevIndicatorsDate", date)
            }
            error={!prevIndicatorsDate.valid && prevIndicatorsDate.touched}
            helperText={
              !prevIndicatorsDate.valid && prevIndicatorsDate.touched ? (
                <Text tid={prevIndicatorsDate.errorMessage} />
              ) : null
            }
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="electricityDay" />}
          currencySymbol=""
          value={electricityDay.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("electricityDay", value)
          }
          error={!electricityDay.valid && electricityDay.touched}
          helperText={
            !electricityDay.valid && electricityDay.touched ? (
              <Text tid={electricityDay.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="electricityNight" />}
          currencySymbol=""
          value={electricityNight.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("electricityNight", value)
          }
          error={!electricityNight.valid && electricityNight.touched}
          helperText={
            !electricityNight.valid && electricityNight.touched ? (
              <Text tid={electricityNight.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="kitchenColdWater" />}
          currencySymbol=""
          value={kitchenColdWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("kitchenColdWater", value)
          }
          error={!kitchenColdWater.valid && kitchenColdWater.touched}
          helperText={
            !kitchenColdWater.valid && kitchenColdWater.touched ? (
              <Text tid={kitchenColdWater.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="kitchenHotWater" />}
          currencySymbol=""
          value={kitchenHotWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("kitchenHotWater", value)
          }
          error={!kitchenHotWater.valid && kitchenHotWater.touched}
          helperText={
            !kitchenHotWater.valid && kitchenHotWater.touched ? (
              <Text tid={kitchenHotWater.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="bathroomColdWater" />}
          currencySymbol=""
          value={bathroomColdWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("bathroomColdWater", value)
          }
          error={!bathroomColdWater.valid && bathroomColdWater.touched}
          helperText={
            !bathroomColdWater.valid && bathroomColdWater.touched ? (
              <Text tid={bathroomColdWater.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label={<Text tid="bathroomHotWater" />}
          currencySymbol=""
          value={bathroomHotWater.value}
          minimumValue="0"
          onChange={(_, value) =>
            props.updatePrevIndicatorsInState("bathroomHotWater", value)
          }
          error={!bathroomHotWater.valid && bathroomHotWater.touched}
          helperText={
            !bathroomHotWater.valid && bathroomHotWater.touched ? (
              <Text tid={bathroomHotWater.errorMessage} />
            ) : null
          }
        />
      </Grid>
    </Grid>
  );
};

export default StepTwo;
