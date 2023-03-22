import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
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

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const numberOfEvents = eventCount || this.state.numberOfEvents;
    console.log({numberOfEvents, eventCount})
    getEvents().then((events) => {
      console.log(events)
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
          console.log(locationEvents)
          const filteredEvents = (locationEvents.length === 0) ? events.slice(0, numberOfEvents) : locationEvents.slice(0, numberOfEvents)
          // const filteredEvents = locationEvents.slice(0, numberOfEvents);
          // const filteredEvents1 = locationEvents.slice(0, Number(numberOfEvents));
          // console.log(filteredEvents1)
      this.setState({
        events: filteredEvents,
        numberOfEvents: numberOfEvents,
      });
    });
  };

  render() {
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
       <CitySearch updateEvents={this.updateEvents} locations={locations} />
       <EventList events={events} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}
        />
      </div>
    );
  }
}

export default App;