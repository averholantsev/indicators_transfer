import React from "react";
import { TextField, Grid } from "@material-ui/core";
import Text from "../UI/Text/Text";

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
            !userEmail.valid && userEmail.touched ? (
              <Text tid={userEmail.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={<Text tid="authPassword" />}
          disabled={props.isDisabled}
          value={password.value}
          type="password"
          autoComplete="new-password"
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("password", event.target.value)
          }
          error={!password.valid && password.touched}
          helperText={
            !password.valid && password.touched ? (
              <Text tid={password.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={<Text tid="firstName" />}
          value={firstName.value}
          onChange={(event) =>
            props.updateUserDataInState("firstName", event.target.value)
          }
          disabled={props.isDisabled}
          error={!firstName.valid && firstName.touched}
          helperText={
            !firstName.valid && firstName.touched ? (
              <Text tid={firstName.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={<Text tid="lastName" />}
          disabled={props.isDisabled}
          value={lastName.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("lastName", event.target.value)
          }
          error={!lastName.valid && lastName.touched}
          helperText={
            !lastName.valid && lastName.touched ? (
              <Text tid={lastName.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={<Text tid="address" />}
          disabled={props.isDisabled}
          value={address.value}
          fullWidth
          onChange={(event) =>
            props.updateUserDataInState("address", event.target.value)
          }
          error={!address.valid && address.touched}
          helperText={
            !address.valid && address.touched ? (
              <Text tid={address.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={<Text tid="accountantEmail" />}
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
              ? <Text tid={accountantEmail.errorMessage} />
              : null
          }
        />
      </Grid>
    </Grid>
  );
};

export default StepOne;
