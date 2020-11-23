import React, { Component } from 'react';
import { getDate, getWeekday } from '../utilities/dates.js'; 

class WeatherListItem extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
      const { onDayClicked, index } = this.props;
      onDayClicked(index);
  }
  render() {    
    const { forecastDay, timezoneOffset } = this.props;    
    const date = getDate(forecastDay.dt, timezoneOffset);   
    const weekday = getWeekday(date);    
    return (        
      <div className="weather-list-item" onClick={this.onClick}>            
        <h2>{date.getMonth() + 1} / {date.getDate()}</h2><h3>{weekday}</h3>
        <h3>{forecastDay.temp.min.toFixed(1)}&deg;F &#124;
        {forecastDay.temp.max.toFixed(1)}&deg;F</h3>       
      </div>    
    );  
  }

}
export default WeatherListItem;