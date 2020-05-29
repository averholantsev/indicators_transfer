import React from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

const StepOne = (props) => {
  const {
    firstName,
    lastName,
    userEmail,
    password,
    accountantEmail,
    address,
  } = props.userDetails;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          disabled={props.isDisabled}
          value={userEmail.value}
          type="email"
          autoComplete="off"
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("userEmail", event.target.value)
          }
          error={!userEmail.valid && userEmail.touched}
          helperText={
            !userEmail.valid && userEmail.touched
              ? userEmail.errorMessage
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Пароль"
          disabled={props.isDisabled}
          value={password.value}
          type="password"
          autoComplete='new-password'
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("password", event.target.value)
          }
          error={!password.valid && password.touched}
          helperText={
            !password.valid && password.touched ? password.errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Имя"
          value={firstName.value}
          onChange={(event) =>
            props.updateUserDataInState("firstName", event.target.value)
          }
          disabled={props.isDisabled}
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
          disabled={props.isDisabled}
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
          disabled={props.isDisabled}
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
          label="Почта бухгалтерии"
          disabled={props.isDisabled}
          value={accountantEmail.value}
          type="email"
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
    </Grid>
  );
};

export default StepOne;
