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
import Text from "../UI/Text/Text";

const DialogCheck = (props) => {
  return (
    <Dialog
      open={props.modalOpen}
      onClose={props.modalHandlerClose}
      maxWidth="xs"
    >
      <DialogTitle align="center">
        <Text tid="dialogCheckTitle" />{" "}
        <Text tid={MONTHS_LIST[props.monthYear.month].text} />{" "}
        {props.monthYear.year} <Text tid="year" />
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              <Text tid="sendIndicatorsElectricity" />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsDay" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.electricityDay.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsNight" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.electricityNight.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              <Text tid="sendIndicatorsKitchen" />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsColdWater" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.coldWaterKitchen.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsHotWater" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.hotWaterKitchen.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              <Text tid="sendIndicatorsBathroom" />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsColdWater" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.coldWaterBathroom.value}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              <Text tid="sendIndicatorsHotWater" />:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" align="center">
              {props.indicators.hotWaterBathroom.value}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Switch
              label={<Text tid="switchMail" />}
              checked={props.sendDataToAccountant}
              switchChange={props.switchChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.modalHandlerClose} color="secondary">
          <Text tid="cancel" />
        </Button>
        <Button onClick={props.sendIndicators} color="primary" autoFocus>
          <Text tid="send" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCheck;
