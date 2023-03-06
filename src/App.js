import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  updateEvents = (location, eventCount) => {
    const { numberOfEvents } = this.state;
    if (location === undefined) location = this.state.selectedLocation;
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      eventCount = eventCount === undefined ? numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length; //Maps the locations and filters events by each location to get the length of the resulting array
      const city = location.split(",").shift(); //Splits location at every comma to only return city
      return { city, number };
    });
    return data;
  };

  componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine) {
      this.setState({
        infoText: "You are offline. Data shown may be out-of-date.",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
       <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateEvents}
        />
      </div>
    );
  }
}

export default App;