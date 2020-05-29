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
    electricity,
    bathroom,
    kitchen,
    prevIndicatorsDate,
  } = props.userDetails;

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
          value={firstName}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("firstName", event.target.value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Фамилия"
          value={lastName}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("lastName", event.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Адрес"
          value={address}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("address", event.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Ваша почта"
          value={userEmail}
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
          value={accountantEmail}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("accountantEmail", event.target.value)
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
            value={prevIndicatorsDate}
            onChange={(date) =>
              props.updateUserDataInState("prevIndicatorsDate", date)
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
          value={electricity.day}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("electricity", "day", value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Электроэнергия: Ночь"
          currencySymbol=""
          value={electricity.night}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("electricity", "night", value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Кухня: Холодная вода"
          currencySymbol=""
          value={kitchen.coldWater}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("kitchen", "coldWater", value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Кухня: Горячая вода"
          currencySymbol=""
          value={kitchen.hotWater}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("kitchen", "hotWater", value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Ванная: Холодная вода"
          currencySymbol=""
          value={bathroom.coldWater}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("bathroom", "coldWater", value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          className={classes.field}
          disabled={props.isDisabled}
          label="Ванная: Горячая вода"
          currencySymbol=""
          value={bathroom.hotWater}
          minimumValue="0"
          onChange={(_, value) =>
            props.updateIndicatorsInState("bathroom", "hotWater", value)
          }
        />
      </Grid>
      <Grid className={classes.buttonPosition} item xs={12}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            props.updateUserDetails(props.userId);
          }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCard;
