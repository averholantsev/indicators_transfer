import React, { Component } from "react";
import axios from "../../axios-main";

import UserCard from "../../components/UserCard/UserCard";
import Loader from "../../components/UI/Loader/Loader";
import Typography from "@material-ui/core/Typography";

import { withSnackbar } from "notistack";

class UsersProfile extends Component {
  state = {
    userDetails: null,
    userId: null,
  };

  componentDidMount() {
    this.getUserDetails(localStorage.getItem('userId'));
  }

  getUserDetails = (id) => {
    console.log("Получение данных по UserId: ", id);
    const token = localStorage.getItem('token');
    axios
      .get(`/users.json?auth=${token}&orderBy="userId"&equalTo="${id}"`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        let userDetails = response.data[Object.keys(response.data)];

        this.setState({
          userDetails: userDetails,
          userId: Object.keys(response.data)[0],
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, обратитесь к Системному Администратору.",
        });
      });
  };

  updateUserDetails = (id) => {
    console.log("Обновление записи по Id: ", id);
    const newData = this.state.userDetails;
    const token = localStorage.getItem('token');
    axios
      .patch(`/users/${id}.json?auth=${token}`, newData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.props.enqueueSnackbar("Данные успешно сохранены!", {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  updateUserDataInState = (key, value) => {
    let newUserDetails = { ...this.state.userDetails };
    newUserDetails[key] = value;

    this.setState({ userDetails: newUserDetails });
  };

  updateIndicatorsInState = (id, value) => {
    let newUserDetails = { ...this.state.userDetails };
    let indexOfNewIndicator = newUserDetails.prevIndicators.findIndex(
      (item) => item.id === id
    );
    newUserDetails.prevIndicators[indexOfNewIndicator].intake = value;

    this.setState({ userDetails: newUserDetails });
  };

  render() {
    return (
      <div>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          Профиль пользователя
        </Typography>
        {this.state.userDetails === null ? (
          <Loader />
        ) : (
          <UserCard
            userDetails={this.state.userDetails}
            userId={this.state.userId}
            updateUserDataInState={this.updateUserDataInState}
            updateIndicatorsInState={this.updateIndicatorsInState}
            updateUserDetails={this.updateUserDetails}
          />
        )}
      </div>
    );
  }
}

export default withSnackbar(UsersProfile);
