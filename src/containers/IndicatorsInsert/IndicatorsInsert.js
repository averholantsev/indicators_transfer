import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class IndicatorsInsert extends Component {
  state = {
    ElectricityDay: null,
    ElectricityDayValid: false,
    ElectricityNight: null,
    ElectricityNightValid: false,
    ColdWaterKittchen: null,
    ColdWaterKittchenValid: false,
    ColdWaterBathroom: null,
    ColdWaterBathroomValid: false,
    HotWaterKittchen: null,
    HotWaterKittchenValid: false,
    HotWaterBathroom: null,
    HotWaterBathroomValid: false    
  };

  setStateParam = (param, event) => {
    const stateParam = param;
    const stateParamValid = param + 'Valid';
    const eventValue = event.target.value;

    if (!Number(eventValue)) {
      return;
    } else this.setState({[stateParam]: eventValue}, () => this.validateField(stateParamValid, eventValue));
  };

  validateField = (fieldName, value) => {
    if (Number(value) > 0 && Number(value) % 1 === 0) {
      this.setState({[fieldName]: true});
    } else this.setState({[fieldName]: false});
    
  };

  sendIndicators = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

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
      <form>
        <h1>Отправка показаний</h1>
        <div>
          <h2>Электроэнергия</h2>
          <Input
            id={'ElectricityDay'}
            label={'День'}
            placeholder={'Введите дневное потребление'}
            name={'ElectricityDay'}
            changed={(event) => this.setStateParam('ElectricityDay', event)}
          />
          <Input
            id={'ElectricityNight'}
            label={'Ночь'}
            placeholder={'Введите ночное потребление'}
            name={'ElectricityNight'}
            changed={(event) => this.setStateParam('ElectricityNight', event)}
          />
        </div>
        <div>
          <h2>Холодная вода</h2>
          <Input
            id={'ColdWaterKittchen'}
            label={'Кухня'}
            placeholder={'Введите потребление'}
            name={'ColdWaterKittchen'}
            changed={(event) => this.setStateParam('ColdWaterKittchen', event)}
            type="text"
            pattern="[0-9]*"
          />
          <Input
            id={'ColdWaterBathroom'}
            label={'Ванная'}
            placeholder={'Введите потребление'}
            name={'ColdWaterBathroom'}
            changed={(event) => this.setStateParam('ColdWaterBathroom', event)}
          />
        </div>
        <div>
          <h2>Горячая вода</h2>
          <Input
            id={'HotWaterKittchen'}
            label={'Кухня'}
            placeholder={'Введите потребление'}
            name={'HotWaterKittchen'}
            changed={(event) => this.setStateParam('HotWaterKittchen', event)}
          />
          <Input
            id={'HotWaterBathroom'}
            label={'Ванная'}
            placeholder={'Введите потребление'}
            name={'HotWaterBathroom'}
            changed={(event) => this.setStateParam('HotWaterBathroom', event)}
          />
        </div>
        <Button 
          type={'submit'}
          name={'Отправить'}
          clicked={this.sendIndicators}
        />
      </form>
    )
  };
};

export default IndicatorsInsert;
