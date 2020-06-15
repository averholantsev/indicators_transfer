import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";

import "./AuthForm.css";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";
import {
  AuthButton,
  AuthInput,
  AuthInputPassword,
  AuthAlert,
} from "../../components/UI/AuthComponents/index";
import { Typography, Link, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LanguageSelector from "../../components/Languages/LanguageSelector";
import Text from "../../components/UI/Text/Text";

// Реализация классового компонента формы
class AuthForm extends Component {
  state = {
    auth: {
      email: {
        value: "",
        validation: {
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        value: "",
        validation: {
          isPassord: true,
        },
        valid: false,
        touched: false,
      },
    },
    authValid: false,
  };

  //Функция для обновления состояния полей ввода
  inputHandler = (key, value) => {
    let validation = checkFieldValidity(value, this.state.auth[key].validation);
    let newAuthState = {
      ...this.state.auth,
      [key]: {
        ...this.state.auth[key],
        value: value,
        valid: validation.isValid,
        errorMessage: validation.errorMessage,
        touched: true,
      },
    };

    let formValid = this.checkFormValidity(newAuthState);

    this.setState({ auth: newAuthState, authValid: formValid });
  };

  checkFormValidity = (stateData) => {
    if (typeof stateData !== "undefined") {
      const { email, password } = stateData;
      if (email.valid && password.valid) {
        return true;
      }
    }

    if (typeof stateData === "undefined") {
      let newAuthState = {
        ...this.state.auth,
        email: {
          ...this.state.auth.email,
          touched: true,
          errorMessage: "requiredField",
        },
        password: {
          ...this.state.auth.password,
          touched: true,
          errorMessage: "requiredField",
        },
      };
      this.setState({ auth: newAuthState });
    }

    return false;
  };

  //Функция для отправки данных формы
  formSenderHandler = () => {
    this.props.onAuth(
      this.state.auth.email.value,
      this.state.auth.password.value
    );
  };

  render() {
    const { email, password } = this.state.auth;

    return (
      <div>
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <LanguageSelector theme="dark" />
        </div>
        <div className="auth_container">
          <form>
            <div className="lockIconContainer">
              <div className="roundIcon">
                <LockOutlinedIcon />
              </div>
            </div>
            <Typography className="authHeader" variant="h5" align="center">
              <Text tid="systemName" />
            </Typography>
            {this.props.errorMessage ? (
              <AuthAlert severity="error">{this.props.errorMessage}</AuthAlert>
            ) : null}
            <AuthInput
              id="email"
              label={<Text tid="authEmail" />}
              name="email"
              error={!email.valid && email.touched}
              helperText={
                !email.valid && email.touched ? (
                  <Text tid={email.errorMessage} />
                ) : null
              }
              onChange={(event) =>
                this.inputHandler("email", event.target.value)
              }
              value={email.value}
            />
            <AuthInputPassword
              id="password"
              label={<Text tid="authPassword" />}
              name="password"
              error={!password.valid && password.touched}
              helperText={
                !password.valid && password.touched ? (
                  <Text tid={password.errorMessage} />
                ) : null
              }
              onChange={(event) =>
                this.inputHandler("password", event.target.value)
              }
              value={password.value}
            />
            <AuthButton
              onClick={
                this.state.authValid
                  ? () => this.formSenderHandler()
                  : () => this.checkFormValidity()
              }
            >
              <Text tid="authSignIn" />
            </AuthButton>
            <Grid container spacing={1} direction="row">
              <Grid item xs={6}>
                <Typography>
                  <Link
                    component={NavLink}
                    to="/forgot-password"
                    variant="body2"
                  >
                    <Text tid="authForgotPassword" />
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <Link component={NavLink} to="/registration" variant="body2">
                    <Text tid="authSignUp" />
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

//Использование Redux
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    errorMessage: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
