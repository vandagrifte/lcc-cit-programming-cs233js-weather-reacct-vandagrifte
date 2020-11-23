import React, { Component } from 'react';
import './App.css';
import getLocation from '../utilities/googleMaps';
import WeatherList from './WeatherList';
import { get } from 'axios';
import CurrentDay from '../components/CurrentDay'

import ZipForm from './ZipForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",
      city: {},
      forecast: [],
      selectedDate: null
    };

    this.urlOpenWeather = "https://api.openweathermap.org/data/2.5/onecall?";
    this.apikeyOpenWeather = "&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9";

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDayClicked = this.onDayClicked.bind(this);

  }
  render() {
    const { forecast, timezoneOffset, selectedDate, city } = this.state;
    return (
      <div id="app-container">
        <div className="app">
          <ZipForm onSubmit={this.onFormSubmit} />
          <WeatherList forecastDays={forecast}
            timezoneOffset={timezoneOffset}
            onDayClicked={this.onDayClicked} />
          {selectedDate !== null &&
            <CurrentDay forecastDay={forecast[selectedDate]}
              city={city} timezoneOffset={timezoneOffset} />}
        </div>
      </div>
    );
  }


  onFormSubmit(zipcode) {
    //this.setState( {zipcode} ); //or {zipcode: zipcode}
    getLocation(zipcode)
      .then(data => {
        const name = data.results[0].address_components[1].long_name;
        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        get(`${this.urlOpenWeather}lat=${lat}&lon=${lng}${this.apikeyOpenWeather}`)
          .then(({ data }) => {
            const timezoneOffset = data.timezone_offset;
            // sometimes there are 8 days
            data.daily.splice(7);
            const forecast = data.daily;
            this.setState({
              zipcode, forecast, timezoneOffset,
              selectedDate: null,
              city: { name, lat, lng }
            });
          })
          .catch(error => {
            alert('There was a problem getting weather info!');
          });
      })
      .catch(error => {
        alert('There was a problem getting location information!')
      });
  }


  onDayClicked(dayIndex) {
    this.setState({ selectedDate: dayIndex });
  }
}
export default App;