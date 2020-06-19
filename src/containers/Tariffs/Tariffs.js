import React, { Component } from "react";
import axios from "../../axios-main";

import { withSnackbar } from "notistack";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";
import Loader from "../../components/UI/Loader/Loader";
import TariffCard from "../../components/TariffCard/TariffCard";
import DialogSimple from "../../components/UI/DialogSimple/DialogSimple";
import Text from "../../components/UI/Text/Text";

import Typography from "@material-ui/core/Typography";
import { Button, Grid } from "@material-ui/core";

class Tariffs extends Component {
  state = {
    tariffs: [],
    deleteDialogOpen: false,
    deleteTariffId: null,
    addButtonDisabled: false,
    error: null,
  };

  componentDidMount() {
    this.getListOfTariffs();
  }

  getListOfTariffs = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios
      .get(`/tariffs.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);

        if (Object.keys(response.data).length !== 0) {
          let tariffs = Object.keys(response.data).map((item) => {
            let tariff = {};
            tariff.name = {
              value: response.data[item].name,
              validation: {
                required: true,
              },
              valid: true,
              errorMessage: "",
              touched: true,
            };
            tariff.cost = {
              value: response.data[item].cost,
              validation: {
                required: true,
              },
              valid: true,
              errorMessage: "",
              touched: true,
            };
            tariff.dateStart = {
              value: response.data[item].dateStart,
              validation: {
                required: true,
              },
              valid: true,
              errorMessage: "",
              touched: true,
            };
            tariff.dateEnd = {
              value: response.data[item].dateEnd,
              validation: {
                required: true,
              },
              valid: true,
              errorMessage: "",
              touched: true,
            };
            tariff.id = item;
            tariff.tariffValid = true;
            tariff.userId = response.data[item].userId;
            return tariff;
          });
          this.setState({ tariffs: tariffs });
        } else {
          this.setState({ error: "tariffErrorNotYetSend" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteItemFromTariffs = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/tariffs/${this.state.deleteTariffId}.json?auth=${token}`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.setState({ deleteTariffId: null });
        this.props.enqueueSnackbar(<Text tid="objectDeleted" />, {
          variant: "info",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  updateItemInTariffs = (id) => {
    console.log("Обновление записи", id);
    const token = localStorage.getItem("token");
    const oldData = this.state.tariffs.find((item) => item.id === id);
    const newData = {
      cost: oldData.cost.value,
      dateEnd: oldData.dateEnd.value,
      dateStart: oldData.dateStart.value,
      name: oldData.name.value,
      userId: oldData.userId,
    };
    console.log("Сформированные данные", newData);

    axios
      .patch(`/tariffs/${id}.json?auth=${token}`, newData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.props.enqueueSnackbar(<Text tid="saveData" />, {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  insertItemToTariffs = (index) => {
    console.log("Сохраниение записи", index);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const oldData = this.state.tariffs[0];
    const newData = {
      cost: oldData.cost.value,
      dateEnd: oldData.dateEnd.value,
      dateStart: oldData.dateStart.value,
      name: oldData.name.value,
      userId: userId,
    };
    console.log("Сформированные данные", newData);

    axios
      .post(`/tariffs.json?auth=${token}`, newData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        let newTariffs = [...this.state.tariffs];

        newTariffs[index] = {
          ...this.state.tariffs[index],
          id: response.data.name,
          userId: userId,
        };

        this.setState({ addButtonDisabled: false, tariffs: newTariffs });
        this.props.enqueueSnackbar(<Text tid="saveData" />, {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  handleDeleteDialogOpen = (id) => {
    if (typeof id !== "undefined") {
      this.setState({ deleteDialogOpen: true, deleteTariffId: id });
    } else {
      if (this.state.tariffs.length === 1) {
        this.setState({ error: "tariffErrorNotYetSend" });
      }
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
    this.setState({ error: null });
    let newTariffsList = [...this.state.tariffs];

    newTariffsList.unshift({
      name: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      cost: {
        value: 0,
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      dateStart: {
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      dateEnd: {
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
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
    let newTariff = [...this.state.tariffs];
    let changeIndex = newTariff.findIndex((item) => item.id === id);

    let validation = checkFieldValidity(
      value,
      newTariff[changeIndex][key].validation
    );

    newTariff[changeIndex] = {
      ...this.state.tariffs[changeIndex],
      [key]: {
        ...this.state.tariffs[changeIndex][key],
        value: value,
        valid: validation.isValid,
        errorMessage: validation.errorMessage,
        touched: true,
      },
    };

    let formValid = this.checkFormValidity(newTariff[changeIndex]);

    newTariff[changeIndex].tariffValid = formValid;

    this.setState({ tariffs: newTariff });
  };

  checkFormValidity = (tariff) => {
    const { name, cost, dateStart, dateEnd } = tariff;

    if (name.valid && cost.valid && dateStart.valid && dateEnd.valid) {
      return true;
    }

    return false;
  };

  render() {
    let tariffCards = null;
    if (this.state.tariffs.length === 0 && this.state.error === null)
      tariffCards = <Loader />;
    else if (this.state.error !== null) {
      tariffCards = (
        <p style={{ textAlign: "center" }}>
          <Text tid={this.state.error} />
        </p>
      );
    } else
      tariffCards = this.state.tariffs.map((item, index) => (
        <TariffCard
          key={typeof item.id !== "undefined" ? item.id : index}
          tarriffIndex={index}
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
      <div>
        <DialogSimple
          open={this.state.deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose}
          handleContinue={this.handleDeleteDialogContinue}
          dialogTitle="outlayDeleteDialogTitle"
          dialogContent="outlayDeleteDialogContent"
          activeButtonName="delete"
        />
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          <Text tid="tariffs" />
        </Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          <Button
            onClick={() => this.addTariffToState(tariffCards)}
            color="primary"
            disabled={this.state.addButtonDisabled}
          >
            <Text tid="addTariff" />
          </Button>
        </Grid>
        {tariffCards}
      </div>
    );
  }
}

export default withSnackbar(Tariffs);
