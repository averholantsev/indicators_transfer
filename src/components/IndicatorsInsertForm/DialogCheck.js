import React from "react";

import { MONTHS_LIST } from "./Constants";
import Switch from "../UI/Switch/Switch";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@material-ui/core";

const DialogCheck = (props) => {
  return (
    <Dialog
      open={props.modalOpen}
      onClose={props.modalHandlerClose}
      maxWidth="xs"
    >
      <DialogTitle align="center">
        Проверьте показатели за {MONTHS_LIST[props.monthYear.month].text}{" "}
        {props.monthYear.year} г.
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Электроэнергия
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              День:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.electricityDay.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              Ночь:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.electricityNight.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Кухня
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              Холодная вода:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.coldWaterKitchen.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              Горячая вода:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.hotWaterKitchen.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Ванная
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              Холодная вода:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.coldWaterBathroom.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              Горячая вода:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.hotWaterBathroom.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Switch
              label="Отправить в бухгалтерию"
              checked={props.sendDataToAccountant}
              switchChange={props.switchChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.modalHandlerClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={props.sendIndicators} color="primary" autoFocus>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCheck;
