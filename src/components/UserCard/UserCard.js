import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import TextField from "@material-ui/core/TextField";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "20px 0",
  },
  cardPadding: {
    padding: "16px !important",
  },
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
    prevIndicators,
    prevIndicatorsDate,
  } = props.userDetails;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardPadding}>
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
                props.updateUserDataInState(
                  "accountantEmail",
                  event.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Начальные показатели
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.field}
                label="Дата первичных показателей"
                format="dd.MM.yyyy"
                value={prevIndicatorsDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                onChange={(date) =>
                  props.updateUserDataInState("prevIndicatorsDate", date)
                }
              />
            </MuiPickersUtilsProvider>
          </Grid>
          {prevIndicators.map((item, index) => (
            <Grid key={index} item xs={6}>
              <CurrencyTextField
                className={classes.field}
                label={item.name}
                currencySymbol=""
                value={item.intake}
                minimumValue="0"
                onChange={(_, value) =>
                  props.updateIndicatorsInState(item.id, value)
                }
              />
            </Grid>
          ))}

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
      </CardContent>
    </Card>
  );
};

export default UserCard;
