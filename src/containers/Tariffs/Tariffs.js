import React, { Component } from "react";
import axios from "../../axios-main";

import "./Tariffs.css";
import { Loader } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";

import TariffCard from "../../components/TariffCard/TariffCard";
import DialogSimple from "../../components/UI/DialogSimple/DialogSimple";
import Button from "@material-ui/core/Button";

class Tariffs extends Component {
  state = {
    tariffs: [],
    deleteDialogOpen: false,
    deleteTariffId: null,
    addButtonDisabled: false,
  };

  componentDidMount() {
    this.getListOfTariffs();
  }

  getListOfTariffs = () => {
    axios
      .get(`/tariffs.json`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);

        let tariffs = Object.keys(response.data).map((item) => {
          let tariff = response.data[item];
          tariff.id = item;
          return tariff;
        });
        this.setState({ tariffs: tariffs });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, обратитесь к Системному Администратору.",
        });
      });
  };

  deleteItemFromTariffs = () => {
    axios
      .delete(`/tariffs/${this.state.deleteTariffId}.json`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.setState({ deleteTariffId: null });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  updateItemInTariffs = (id) => {
    console.log("Обновление записи", id);
    const oldData = this.state.tariffs.find((item) => item.id === id);
    const newData = {
      cost: oldData.cost,
      dateEnd: oldData.dateEnd,
      dateStart: oldData.dateStart,
      name: oldData.name,
    };
    console.log("Сформированные данные", newData);
    axios
      .patch(`/tariffs/${id}.json`, newData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  insertItemToTariffs = () => {
    console.log("Сохраниение записи");
    const oldData = this.state.tariffs[0];
    const newData = {
      cost: oldData.cost,
      dateEnd: oldData.dateEnd,
      dateStart: oldData.dateStart,
      name: oldData.name,
    };
    console.log("Сформированные данные", newData);
    axios
      .post(`/tariffs.json`, newData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.setState({ addButtonDisabled: false });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  handleDeleteDialogOpen = (id) => {
    if (typeof id !== "undefined") {
      this.setState({ deleteDialogOpen: true, deleteTariffId: id });
    } else {
      this.removeTariffFromState(id);
    }
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false });
  };

  handleDeleteDialogContinue = () => {
    this.removeTariffFromState(this.state.deleteTariffId);
    this.deleteItemFromTariffs();
    this.handleDeleteDialogClose();
  };

  addTariffToState = () => {
    let newTariffsList = [...this.state.tariffs];

    newTariffsList.unshift({
      cost: 0,
      dateEnd: null,
      dateStart: null,
      name: "",
    });

    this.setState({ tariffs: newTariffsList, addButtonDisabled: true });
  };

  removeTariffFromState = (removeId) => {
    let newTariffsList = [...this.state.tariffs];

    newTariffsList = newTariffsList.filter((item) => {
      return item.id !== removeId;
    });

    if (this.state.addButtonDisabled) {
      this.setState({ tariffs: newTariffsList, addButtonDisabled: false });
    } else this.setState({ tariffs: newTariffsList });
  };

  updateTariffInState = (id, key, value) => {
    let newState = [...this.state.tariffs];
    let changeIndex = newState.findIndex((item) => item.id === id);
    newState[changeIndex][key] = value;

    this.setState({ tariffs: newState });
  };

  render() {
    let tariffCards = null;
    if (this.state.tariffs.length === 0) tariffCards = <Loader />;
    else
      tariffCards = this.state.tariffs.map((item, index) => (
        <TariffCard
          key={typeof item.id !== "undefined" ? item.id : index}
          tariff={item}
          disabled={typeof item.id !== "undefined" ? true : false}
          handleDeleteDialogOpen={this.handleDeleteDialogOpen}
          handleDeleteDialogContinue={this.handleDeleteDialogContinue}
          updateItemInTariffs={this.updateItemInTariffs}
          updateTariffInState={this.updateTariffInState}
          insertItemToTariffs={this.insertItemToTariffs}
        />
      ));
    return (
      <div className="tariffContainer">
        <DialogSimple
          open={this.state.deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose}
          handleContinue={this.handleDeleteDialogContinue}
          dialogTitle="Вы уверены?"
          dialogContent="Вы уверены, что хотите удалить данный объект? Этот процесс нельзя будет отменить."
          ё
        />
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          Тарифы
        </Typography>
        <Button
          onClick={() => this.addTariffToState(tariffCards)}
          color="primary"
          disabled={this.state.addButtonDisabled}
        >
          Добавить тариф
        </Button>
        {tariffCards}
      </div>
    );
  }
}

export default Tariffs;
