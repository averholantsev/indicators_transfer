import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
    width: "100%",
  },
  buttonPosition: {
    textAlign: "center",
  },
});

const UserCard = (props) => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    userEmail,
    accountantEmail,
    address,
  } = props.userDetails;

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
        <Typography variant="h5" align="center">
          Контакты
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Имя"
          value={firstName.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("firstName", event.target.value)
          }
          error={!firstName.valid && firstName.touched}
          helperText={
            !firstName.valid && firstName.touched
              ? firstName.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Фамилия"
          value={lastName.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("lastName", event.target.value)
          }
          error={!lastName.valid && lastName.touched}
          helperText={
            !lastName.valid && lastName.touched ? lastName.errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Адрес"
          value={address.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("address", event.target.value)
          }
          error={!address.valid && address.touched}
          helperText={
            !address.valid && address.touched ? address.errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Ваша почта"
          value={userEmail.value}
          disabled
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("userEmail", event.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Почта бухгалтерии"
          value={accountantEmail.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("accountantEmail", event.target.value)
          }
          error={!accountantEmail.valid && accountantEmail.touched}
          helperText={
            !accountantEmail.valid && accountantEmail.touched
              ? accountantEmail.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Первичные показатели
        </Typography>
      </Grid>
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
      <Grid className={classes.buttonPosition} item xs={12}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            if (props.checkFormValidity()) props.updateUserDetails();
          }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCard;
