import React from "react";

import NumberTextField from "../UI/NumberTextField/NumberTextField";
import { MONTHS_LIST } from "./Constants";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Text from "../UI/Text/Text";

const Indicators = (props) => {
  const {
    electricityDay,
    electricityNight,
    coldWaterKitchen,
    coldWaterBathroom,
    hotWaterKitchen,
    hotWaterBathroom,
  } = props.indicators;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          <Text tid="sendIndicatorsMonthYear" />
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel>
            <Text tid="sendIndicatorsMonth" />
          </InputLabel>
          <Select
            value={props.monthYear.month || 0}
            onChange={(event) =>
              props.setStateMonthYear("month", event.target.value)
            }
          >
            {MONTHS_LIST.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <Text tid={item.text} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel>
            <Text tid="sendIndicatorsYear" />
          </InputLabel>
          <Select
            value={props.monthYear.year || 2020}
            onChange={(event) =>
              props.setStateMonthYear("year", event.target.value)
            }
          >
            {props.getCurrentYear().map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          <Text tid="sendIndicatorsElectricity" />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsDay" />}
          value={electricityDay.value}
          onChange={(event) =>
            props.updateIndicatorsInState("electricityDay", event.target.value)
          }
          error={!electricityDay.valid && electricityDay.touched}
          helperText={
            !electricityDay.valid && electricityDay.touched ? (
              <Text tid={electricityDay.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsNight" />}
          value={electricityNight.value}
          onChange={(event) =>
            props.updateIndicatorsInState("electricityNight", event.target.value)
          }
          error={!electricityNight.valid && electricityNight.touched}
          helperText={
            !electricityNight.valid && electricityNight.touched ? (
              <Text tid={electricityNight.errorMessage} />
            ) : null
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          <Text tid="sendIndicatorsKitchen" />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsColdWater" />}
          value={coldWaterKitchen.value}
          onChange={(event) =>
            props.updateIndicatorsInState("coldWaterKitchen", event.target.value)
          }
          error={!coldWaterKitchen.valid && coldWaterKitchen.touched}
          helperText={
            !coldWaterKitchen.valid && coldWaterKitchen.touched ? (
              <Text tid={coldWaterKitchen.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsHotWater" />}
          value={hotWaterKitchen.value}
          onChange={(event) =>
            props.updateIndicatorsInState("hotWaterKitchen", event.target.value)
          }
          error={!hotWaterKitchen.valid && hotWaterKitchen.touched}
          helperText={
            !hotWaterKitchen.valid && hotWaterKitchen.touched ? (
              <Text tid={hotWaterKitchen.errorMessage} />
            ) : null
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          <Text tid="sendIndicatorsBathroom" />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsColdWater" />}
          value={coldWaterBathroom.value}
          onChange={(event) =>
            props.updateIndicatorsInState(
              "coldWaterBathroom",
              event.target.value
            )
          }
          error={!coldWaterBathroom.valid && coldWaterBathroom.touched}
          helperText={
            !coldWaterBathroom.valid && coldWaterBathroom.touched ? (
              <Text tid={coldWaterBathroom.errorMessage} />
            ) : null
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberTextField
          label={<Text tid="sendIndicatorsHotWater" />}
          value={hotWaterBathroom.value}
          onChange={(event) =>
            props.updateIndicatorsInState(
              "hotWaterBathroom",
              event.target.value
            )
          }
          error={!hotWaterBathroom.valid && hotWaterBathroom.touched}
          helperText={
            !hotWaterBathroom.valid && hotWaterBathroom.touched ? (
              <Text tid={hotWaterBathroom.errorMessage} />
            ) : null
          }
        />
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={
            props.indicatorsValid
              ? props.modalHandlerOpen
              : () => props.checkFormValidity()
          }
        >
          <Text tid="send" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Indicators;
