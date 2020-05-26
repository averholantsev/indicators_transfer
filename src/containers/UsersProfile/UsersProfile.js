import React, { Component } from "react";
import UserCard from '../../components/UserCard/UserCard'
import Typography from "@material-ui/core/Typography";

class UsersProfile extends Component {
  state = {
    userDetails: {
      firstName: "Артем",
      lastName: "Верхоланцев",
      userEmail: "verkholantsevad@gmail.com",
      accountantEmail: "makarenko6-190@mail.ru",
      address: "ул. Макаренко, д. 6, кв. 88",
      prevIndicators: [
        {
          name: "Эл-я день:",
          intake: 18572,
        },
        {
          name: "Эл-я ночь:",
          intake: 6699,
        },
        {
          name: "Холодная вода:",
          intake: 402,
        },
        {
          name: "Горячая вода:",
          intake: 420,
        },
        {
          name: "Водоотведение:",
          intake: 822,
        },
      ],
      prevIndicatorsDate: "2019-01-01T00:00:00+00:00",
    },
    
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
        <UserCard userDetails={this.state.userDetails} />
      </div>
    );
  }
}

export default UsersProfile;
