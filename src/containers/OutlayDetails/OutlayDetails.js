import React, { Component } from 'react'
import axios from '../../axios-orders'

import Outlay from '../../components/Outlay/Outlay'

class OutlayDetails extends Component {
  state = {
    indicatorsList: null
  }

  componentDidMount() {
    console.log('componentDidUpdate отработал');    
    axios
      .get('/indicators.json')
      .then(response => {
        console.log(response.data);
        let indicatorsList = [];
        response.data.map((key, index) => {
          return indicatorsList.push(
            {
              id: key,
              date: response.data[key].CurrentDate.today,
              indicators: {
                electricity: response.data[key].Electricity,
                coldWater: response.data[key].ColdWater,
                hotWater: response.data[key].HotWater
              },
              outlay: {
                electricityOutlayDay: response.data[key] === response.data[0] ? response.data[index].Electricity.Day : (response.data[index].Electricity.Day - response.data[key-1].Electricity.Day)
              }
            }
          );
        });
        indicatorsList.sort((a, b) => {
          let dateA = new Date(a.date), dateB = new Date(b.date)
          return dateA - dateB;
        });
        this.setState({ indicatorsList: indicatorsList});
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.indicatorsList == null ? 
          <p>Загразка...</p> : 
          this.state.indicatorsList.map( ind => (
            <Outlay key={ind.id} indicators={ind.indicators} date={ind.date}/>
          ))
        }
      </div>
    )
  }
}

export default OutlayDetails;