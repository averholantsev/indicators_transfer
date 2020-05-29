import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { NavLink } from "react-router-dom";

import "./AuthForm.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AuthInput from "../../components/UI/AuthComponents/AuthInput";
import AuthInputPassword from "../../components/UI/AuthComponents/AuthInputPassword";
import AuthButton from "../../components/UI/AuthComponents/AuthButton";
import CSSAlert from "../../components/UI/AuthComponents/AuthAlert";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Реализация классового компонента формы
class AuthForm extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: false,
    validateFields: {
      email: false,
      password: false,
    },
    fieldValidationErrors: {
      email: "Обязательное поле!",
      password: "Обязательное поле!",
    },
    willSend: true,
  };

  //Функция для обновления состояния полей ввода
  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.validation(name, value);

    //Обновление State значения почты или пароля
    this.setState({ [name]: value });
  };

  //Валидация
  validation = (name, value) => {
    const reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    let validateFieldsUpdate = { ...this.state.validateFields };
    let fieldValidationErrors = { ...this.state.fieldValidationErrors };
    switch (name) {
      case "email":
        validateFieldsUpdate.email = reg.test(value);
        if (value.length === 0) {
          fieldValidationErrors.email = "Обязательное поле!";
        } else fieldValidationErrors.email = "Проверьте корректность почты";
        break;
      case "password":
        validateFieldsUpdate.password = value.length >= 6;
        if (value.length === 0) {
          fieldValidationErrors.password = "Обязательное поле!";
        } else
          fieldValidationErrors.password =
            "Пароль должен быть более 6 символов";
        break;
      default:
        break;
    }
    this.setState({
      validateFields: validateFieldsUpdate,
      fieldValidationErrors: fieldValidationErrors,
    });
  };

  //Функция для обновления состояния чекбокса
  checkboxHandler = () => {
    let checkbox = this.state.rememberMe;

    this.setState({ rememberMe: !checkbox });
  };

  //Функция для отправки данных формы
  formSenderHandler = () => {
    //Проверка на заполненные поля
    if (this.state.validateFields.email && this.state.validateFields.password) {
      this.setState({ willSend: true });
      //Отправка POST запроса на backend
      this.props.onAuth(
        this.state.email,
        this.state.password
      );
    } else {
      this.setState({ willSend: false });
    }
  };

  render() {
    //Вспомогательные переменные для отображения валидации и подсказки
    let emailError = false;
    let passwordError = false;

    if (!this.state.willSend) {
      emailError = !this.state.validateFields.email;
      passwordError = !this.state.validateFields.password;
    }

    return (
      <div className="auth_container">
        <form>
          <div className="lockIconContainer">
            <div className="roundIcon">
              <LockOutlinedIcon />
            </div>
          </div>
          <Typography className="authHeader" variant="h5" align="center">
            Система коммунальных показателей
          </Typography>
          {this.props.errorMessage ? (
            <CSSAlert severity="error">{this.props.errorMessage}</CSSAlert>
          ) : null}
          <AuthInput
            key="email"
            id="email"
            label="Почта"
            name="email"
            error={emailError}
            helperText={
              emailError ? this.state.fieldValidationErrors.email : null
            }
            onChange={this.inputHandler}
            value={this.state.email}
          />
          <AuthInputPassword
            key="password"
            id="password"
            label="Пароль"
            name="password"
            error={passwordError}
            helperText={
              passwordError ? this.state.fieldValidationErrors.password : null
            }
            onChange={this.inputHandler}
            value={this.state.password}
          />
          <AuthButton onClick={this.formSenderHandler}>
            Войти в аккаунт
          </AuthButton>
          <Typography>
            <Link component={NavLink} to="/registration" variant="body2">
              Еще нет аккаунта? Регистрация
            </Link>
          </Typography>
        </form>
      </div>
    );
  }
}

//Использование Redux
const mapStateToProps = (state) => {
  return {
    isAuth: state.token !== null,
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
