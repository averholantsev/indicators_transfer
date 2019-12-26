import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class IndicatorsInsert extends Component {
  state = {
    ElectricityDay: null,
    ElectricityNight: null,
    ColdWaterKittchen: null,
    ColdWaterBathroom: null,
    HotWaterKittchen: null,
    HotWaterBathroom: null
  }
  
  setElectricityDay = (event) => {
    this.setState({ElectricityDay: event.target.value});
  };

  setElectricityNight = (event) => {
    this.setState({ElectricityNight: event.target.value});
  };

  setColdWaterKittchen = (event) => {
    this.setState({ColdWaterKittchen: event.target.value});
  };

  setColdWaterBathroom = (event) => {
    this.setState({ColdWaterBathroom: event.target.value});
  };

  setHotWaterKittchen = (event) => {
    this.setState({HotWaterKittchen: event.target.value});
  };

  setHotWaterBathroom = (event) => {
    this.setState({HotWaterBathroom: event.target.value});
  };

  sendIndicators = () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-01';

    const indicators = {
      Electricity: {
        Day: this.state.ElectricityDay,
        Night: this.state.ElectricityNight
      },
      ColdWater: {
        Kittchen: this.state.ColdWaterKittchen,
        Bathroom: this.state.ColdWaterBathroom
      },
      HotWater: {
        Kittchen: this.state.HotWaterKittchen,
        Bathroom: this.state.HotWaterBathroom
      },
      CurrentDate: {today}
    }
    console.log(indicators);
  };


  render() {
    return (
      <div>
        <h1>Отправка показаний</h1>
        <div>
          <h2>Электроэнергия</h2>
          <Input
            id={'Day'}
            label={'День'}
            placeholder={'Введите дневное потребление'}
            name={'Day'}
            changed={(event) => this.setElectricityDay(event)}
          />
          <Input
            id={'Night'}
            label={'Ночь'}
            placeholder={'Введите ночное потребление'}
            name={'Night'}
            changed={(event) => this.setElectricityNight(event)}
          />
        </div>
        <div>
          <h2>Холодная вода</h2>
          <Input
            id={'ColdWaterKittchen'}
            label={'Кухня'}
            placeholder={'Введите потребление'}
            name={'ColdWaterKittchen'}
            changed={(event) => this.setColdWaterKittchen(event)}
          />
          <Input
            id={'ColdWaterBathroom'}
            label={'Ванная'}
            placeholder={'Введите потребление'}
            name={'ColdWaterBathroom'}
            changed={(event) => this.setColdWaterBathroom(event)}
          />
        </div>
        <div>
          <h2>Горячая вода</h2>
          <Input
            id={'HotWaterKittchen'}
            label={'Кухня'}
            placeholder={'Введите потребление'}
            name={'HotWaterKittchen'}
            changed={(event) => this.setHotWaterKittchen(event)}
          />
          <Input
            id={'HotWaterBathroom'}
            label={'Ванная'}
            placeholder={'Введите потребление'}
            name={'HotWaterBathroom'}
            changed={(event) => this.setHotWaterBathroom(event)}
          />
        </div>
        <Button 
          name={'Отправить'}
          clicked={this.sendIndicators}
        />
      </div>
    )
  }
};

export default IndicatorsInsert;
