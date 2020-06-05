import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios-main";
import CONFIG from "../../configuration.json";

import "./ForgotPassword.css";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";
import {
  AuthAlert,
  AuthButton,
  AuthInput,
} from "../../components/UI/AuthComponents/index";
import { Typography, Link } from "@material-ui/core";

export class ForgotPassword extends Component {
  state = {
    email: {
      value: "",
      validation: {
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    errorMessage: "",
    emailSend: false,
  };

  inputHandler = (key, value) => {
    let validation = checkFieldValidity(value, this.state[key].validation);
    let newItem = {
      ...this.state[key],
      value: value,
      valid: validation.isValid,
      errorMessage: validation.errorMessage,
      touched: true,
    };

    this.setState({ [key]: newItem });
  };

  sendPasswordRecovery = () => {
    console.log("Пароль восстановлен");
    const body = {
      requestType: "PASSWORD_RESET",
      email: this.state.email.value,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${CONFIG.AUTH_API_KEY}`,
        body
      )
      .then((response) => {
        console.log(response);
        this.setState({ emailSend: true });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
          this.setState({ errorMessage: "Данный почтовый ящик не зарегистрирован" });
        }
      });
  };

  render() {
    const { email } = this.state;

    const enterEmail = (
      <div>
        <Typography className="headFont" variant="h5" color="initial">
          Забыли пароль?
        </Typography>
        <Typography className="typeFont" variant="body1" color="initial">
          Для восстановления пароля введите ваш адрес электронной почты и вам
          будет отправлено письмо с дальнейшими инструкциями.
        </Typography>
        {this.state.errorMessage ? (
          <AuthAlert severity="error">{this.state.errorMessage}</AuthAlert>
        ) : null}
        <AuthInput
          id="email"
          label="Почта"
          name="email"
          value={email.value}
          error={!email.valid && email.touched}
          helperText={!email.valid && email.touched ? email.errorMessage : null}
          onChange={(event) => this.inputHandler("email", event.target.value)}
        />
        <AuthButton
          disabled={!this.state.email.valid}
          onClick={this.sendPasswordRecovery}
        >
          Восстановить
        </AuthButton>
      </div>
    );

    const information = (
      <div>
        <Typography className="headFont" variant="h5" color="initial">
          Письмо отправлено!
        </Typography>
        <Typography className="typeFont" variant="body1" color="initial">
          Вам было отправлено письмо на адрес электронной почты{" "}
          <b>{email.value}</b> с дальнейшими инструкциями. Пожалуйста проверьте
          ваш почтовый ящик.
        </Typography>
        <Typography>
          <Link component={NavLink} to="/auth" variant="body2">
            Вернутся на форму входа
          </Link>
        </Typography>
      </div>
    );

    return (
      <div className="form_container">
        {!this.state.emailSend ? enterEmail : information}
      </div>
    );
  }
}

export default ForgotPassword;
