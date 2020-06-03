import React from "react";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
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

const Indicators = (props) => {
  const errorMessage = "Поле обязательно для заполнения";
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          Месяц и год
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Месяц</InputLabel>
          <Select
            value={props.monthYear.month || 0}
            onChange={(event) => props.setStateMonth(event, event.target.value)}
          >
            {MONTHS_LIST.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Год</InputLabel>
          <Select
            value={props.monthYear.year || 2020}
            onChange={(event) => props.setStateYear(event, event.target.value)}
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
          Электроэнергия
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="День"
          currencySymbol=""
          value={props.indicators.electricityDay.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("electricityDay", value)
          }
          error={!props.indicators.electricityDay.valid}
          helperText={
            !props.indicators.electricityDay.valid ? errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="Ночь"
          currencySymbol=""
          value={props.indicators.electricityNight.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("electricityNight", value)
          }
          error={!props.indicators.electricityNight.valid}
          helperText={
            !props.indicators.electricityNight.valid ? errorMessage : null
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          Кухня
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="Холодная вода"
          currencySymbol=""
          value={props.indicators.coldWaterKitchen.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("coldWaterKitchen", value)
          }
          error={!props.indicators.coldWaterKitchen.valid}
          helperText={
            !props.indicators.coldWaterKitchen.valid ? errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="Горячая вода"
          currencySymbol=""
          value={props.indicators.hotWaterKitchen.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("hotWaterKitchen", value)
          }
          error={!props.indicators.hotWaterKitchen.valid}
          helperText={
            !props.indicators.hotWaterKitchen.valid ? errorMessage : null
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" className="headerMargin">
          Ванная
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="Холодная вода"
          currencySymbol=""
          value={props.indicators.coldWaterBathroom.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("coldWaterBathroom", value)
          }
          error={!props.indicators.coldWaterBathroom.valid}
          helperText={
            !props.indicators.coldWaterBathroom.valid ? errorMessage : null
          }
        />
      </Grid>
      <Grid item xs={6}>
        <CurrencyTextField
          style={{ width: "100%" }}
          variant="standard"
          label="Горячая вода"
          currencySymbol=""
          value={props.indicators.hotWaterBathroom.value}
          minimumValue="0"
          onChange={(event, value) =>
            props.addIndicatorHandler("hotWaterBathroom", value)
          }
          error={!props.indicators.hotWaterBathroom.valid}
          helperText={
            !props.indicators.hotWaterBathroom.valid ? errorMessage : null
          }
        />
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={props.modalHandlerOpen}
        >
          Отправить
        </Button>
      </Grid>
    </Grid>
  );
};

export default Indicators;
