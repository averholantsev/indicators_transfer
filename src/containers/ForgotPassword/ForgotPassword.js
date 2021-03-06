import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { sendOobCode } from "../../api/auth";

import "./ForgotPassword.css";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";
import {
  AuthAlert,
  AuthButton,
  AuthInput,
} from "../../components/UI/AuthComponents/index";
import { Typography, Link } from "@material-ui/core";
import LanguageSelector from "../../components/Languages/LanguageSelector";
import Text from "../../components/UI/Text/Text";

export class ForgotPassword extends Component {
  state = {
    email: {
      value: "",
      validation: {
        required: true,
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
    const requestData = {
      requestType: "PASSWORD_RESET",
      email: this.state.email.value,
    };
    sendOobCode(requestData)
      .then((response) => {
        console.log("sendOobCode", response);
        this.setState({ emailSend: true });
      })
      .catch((error) => {
        console.log("[ERROR] sendOobCode", error);
        if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
          this.setState({
            errorMessage: "emailNotReg",
          });
        }
      });
  };

  render() {
    const { email } = this.state;

    const enterEmail = (
      <div>
        <Typography className="headFont" variant="h5" color="initial">
          <Text tid="authForgotPassword" />
        </Typography>
        <Typography className="typeFont" variant="body1" color="initial">
          <Text tid="authPasswordRecovery" />
        </Typography>
        {this.state.errorMessage ? (
          <AuthAlert severity="error">
            <Text tid={this.state.errorMessage} />
          </AuthAlert>
        ) : null}
        <AuthInput
          id="email"
          label={<Text tid="authEmail" />}
          name="email"
          value={email.value}
          error={!email.valid && email.touched}
          helperText={
            !email.valid && email.touched ? (
              <Text tid={email.errorMessage} />
            ) : null
          }
          onChange={(event) => this.inputHandler("email", event.target.value)}
        />
        <AuthButton
          disabled={!this.state.email.valid}
          onClick={this.sendPasswordRecovery}
        >
          <Text tid="recover" />
        </AuthButton>
      </div>
    );

    const information = (
      <div>
        <Typography className="headFont" variant="h5" color="initial">
          <Text tid="authEmailSent" />
        </Typography>
        <Typography className="typeFont" variant="body1" color="initial">
          <Text tid="authEmailSentText1" /> <b>{email.value}</b>{" "}
          <Text tid="authEmailSentText2" />
        </Typography>
        <Typography>
          <Link component={NavLink} to="/auth" variant="body2">
            <Text tid="authReturn" />
          </Link>
        </Typography>
      </div>
    );

    return (
      <div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "20px",
            right: "20px",
            alignItems: "center",
          }}
        >
          <LanguageSelector theme="dark" />
          <Typography>
            <Link
              component={NavLink}
              to="/auth"
              variant="body2"
              style={{ fontSize: "16px" }}
            >
              <Text tid="authSignInShort" />
            </Link>
          </Typography>
        </div>
        <div className="form_container">
          {!this.state.emailSend ? enterEmail : information}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
